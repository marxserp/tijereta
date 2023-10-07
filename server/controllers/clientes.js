import mongoose from "mongoose";
import clienteModel from "../models/clienteModel";

export const createCliente = async (req, res) => {
  const { nombre, apellido, contacto, correo } = req.body;
  const newCliente = new clienteModel({ nombre, apellido, contacto, correo });
  try {
    await newCliente.save();
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCliente = async (req, res) => {
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

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No hay un cliente con ID ${id}.`);

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
};

// Remover cliente (soft delete)

// Eliminar cliente (hard delete)
