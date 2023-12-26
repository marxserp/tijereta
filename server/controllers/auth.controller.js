import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

// Registro

export const register = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasena } = req.body;

    const salt = await bcrypt.genSalt();
    const passHash = await bcrypt.hash(contrasena, salt);

    const newUsuario = new Usuario({
      nombre,
      apellido,
      correo,
      contrasena: passHash,
    });
    const savedUsuario = await newUsuario.save();
    res.status(201).json(savedUsuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ correo: correo });

    if (!usuario)
      return res
        .status(400)
        .json({ msg: "No existen usuarios asociados a este correo." });

    const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!isMatch)
      return res.status(400).json({ msg: "Contrasena incorrecta." });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    delete usuario.contrasena;
    res.status(200).json({ token, usuario });
  } catch (error) {
    console.log(error);
  }
};
