import mongoose from "mongoose";
import clienteModel from "../models/cliente.model.js";
// import usuarioModel from "../models/usuario.model.js";

export const createCliente = async (req, res) => {
  try {
    const { nombre, apellido, correo, contacto, usuario } = req.body;
    const newCliente = new clienteModel({
      nombre,
      apellido,
      correo,
      contacto,
      usuario,
    });
    // TODO: Two factor verification (same user should not create same client twice)
    await newCliente.save();
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(500).json({
      message: `Error de controlador al registrar un cliente: ${error.message}`,
    });
  }
};

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await clienteModel.findById(id);
    res.status(200).json(cliente);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, contacto, correo } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay un cliente con ID ${id}.`);
    const updatedCliente = {
      nombre,
      apellido,
      contacto,
      correo,
      updatedAt: new Date(),
      _id: id,
    };
    await clienteModel.findByIdAndUpdate(id, updatedCliente, { new: true });
    res.json(updatedCliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeCliente = async (req, res) => {
  const { id } = req.params;
  const { status = 0 } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay clientes con ID ${id}`);
    const removedCliente = await clienteModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!removedCliente) return res.status(404).send(`No hay un cliente con ID ${id}.`);
    res.json(removedCliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchClientes = async (req, res) => {
  const { query, limit = 10 } = req.query;
  try {
    const consultaRecortada = query.trim();
    if (!consultaRecortada) {
      return res.json([]);
    }
    const clientes = await clienteModel.find({
      $or: [
        { nombre: { $regex: query, $options: "i" } },
        { apellido: { $regex: query, $options: "i" } },
        { contacto: { $regex: query, $options: "i" } }
      ]
    }).limit(Number(limit));
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Quitar
export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay clientes con ID ${id}`);
  await clienteModel.findByIdAndRemove(id);
  res.json({ message: "Cliente eliminado permanentemente." });
};
