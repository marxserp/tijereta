import mongoose from "mongoose";
import procedimientoModel from "../models/procedimiento.model.js";

export const createProcedimiento = async (req, res) => {
  try {
    const { nombre, descripcion, duracion, precio, usuario } = req.body;
    const newProcedimiento = new procedimientoModel({
      nombre,
      descripcion,
      duracion,
      precio,
      usuario,
    });
    await newProcedimiento.save();
    res.status(201).json(newProcedimiento);
  } catch (error) {
    res.status(500).json({
      message: `Error de controlador al registrar un cliente: ${error.message}`,
    });
  }
};

export const getAllProcedimientos = async (req, res) => {
  try {
    const procedimientos = await procedimientoModel.find();
    res.status(200).json(procedimientos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleProcedimiento = async (req, res) => {
  const { id } = req.params;
  try {
    const procedimiento = await procedimientoModel.findById(id);
    res.satus(200).json(procedimiento);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProcedimiento = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, duracion, precio } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No hay un procedimiento con ID ${id}.`);

  const updateProcedimiento = { nombre, descripcion, duracion, precio };
  await procedimientoModel.findByIdAndUpdate(id, updatedProcedimiento, {
    new: true,
  });

  res.json(updatedProcedimiento);
};

// Remover procedimiento (soft delete)

// Eliminar procedimiento (hard delete)

export const deleteProcedimiento = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No existe ningún procedimiento de ID ${id}`);
  await procedimientoModel.findByIdAndUpdate(id);
  res.json({ message: "Procedimiento eliminado" });
};
