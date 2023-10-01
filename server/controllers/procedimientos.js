import mongoose from "mongoose1";
import procedimientoModel from "../models/procedimientoModel";

export const createProcedimiento = async (req, res) => {
  const { nombre, descripcion, duracion, precio } = req.body;
  const newProcedimiento = new procedimientoModel({
    nombre,
    descripcion,
    duracion,
    precio,
  });
  try {
    await newProcedimiento.save();
    res.status(200).json(newProcedimiento);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getProcedimientos = async (req, res) => {
  try {
    const procedimientos = await procedimientoModel.find();
    res.status(200).json(procedimientos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProcedimiento = async (req, res) => {
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
