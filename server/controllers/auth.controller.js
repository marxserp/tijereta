import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import usuarioModel from "../models/usuario.model.js";
import { transport } from "../middleware/mailComm.js";


export const registerSec = async (req, res) => {
  const { nombre, apellido, correo, contrasena } = req.body;
  try {
    // Genera sal y sala contraseña
    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(contrasena, salt);
    // Genera 3 bytes aleatorios que convierte a hexa
    const codigo = crypto.randomBytes(3).toString("hex");

    const newUsuario = new usuarioModel({ nombre, apellido, correo, contrasena: passHash, codigo, estado: 0 });
    await newUsuario.save();
    // Luego de guardar el usuario, establece un objeto con props. de correo y lo envía
    const mailOp = {
      from: process.env.ADMIN_ADRS,
      to: correo,
      subject: "SIGUE: Código de verificación",
      text: `Tu código de verificación para registrarte en SIGUE es: ${codigo}`
    };
    try {
      await transport.sendMail(mailOp);
    } catch (error) {
      console.error("Error enviando código de verificación:", error);
      res.status(500).send("Error enviando código de verificación");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

export const verification = async (req, res) => {
  const { correo, codigo } = req.body;
  try {
    // Busca usuario con correo y codigo
    const usuario = await usuarioModel.findOne({ correo, codigo });
    if (!usuario) {
      return res.status(400).send("Código no válido");
    }
    // Luego envía correo a admin con dirección a autorizar
    const mailOp = {
      from: process.env.ADMIN_ADRS,
      to: process.env.ADMIN_ADRS,
      subject: "Solicitud de Autorización p/SIGUE",
      text: `Solicitud de autorización para usuario con correo ${correo}`
    };

    transport.sendMail(mailOp, (error, info) => {
      if (error) {
        return res.status(500).send("Error enviando solicitud a Administrador");
      }
      res.status(200).send("Verificación exitosa, aguardando autorización de Administrador");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const authorize = async (req, res) => {
  const { correo } = req.body;
  try {
    // Busca un usuario con ese correo y cambia su estado de autorización
    const usuario = await usuarioModel.findOne({ correo });
    if (!usuario) {
      return res.status(400).send("correo no válido");
    }
    usuario.estado = !usuario.estado;
    await usuario.save();
    res.status(200).send("Usuario autorizado");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const usuario = await usuarioModel.findOne({ correo: correo });
    // Busca un usuario con el correo y lo deja pasar si existe, ,si está autorizado y si coincide la contra salada
    if (!usuario) {
      return res.status(400).json({ msg: "No existen usuarios asociados a este correo." });
    }
    if (usuario.estado === false) {
      return res.status(403).json({ msg: "Usuario no autorizado" });
    }
    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isMatch) {
      return res.status(400).json({ msg: "Contrasena incorrecta." });
    }
    // Firma un webtoken y lo pasa junto al usuario
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    const usuarioObjeto = usuario.toObject();
    delete usuarioObjeto.contrasena;
    res.status(200).json({ token, usuario: usuarioObjeto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleUsuario = async (req, res) => {
  const userId = req.user.id;
  try {
    const usuario = await usuarioModel.findById(userId);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};