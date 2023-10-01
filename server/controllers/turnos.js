import mongoose from "mongoose";
import turnoModel from "../models/turnoModel";

export const createTurno = async (req, res) => {
  const { id_cliente, id_procedimiento, id_procedimientoAdicional, fecha } =
    req.body;
  const newCliente = new {
    id_cliente,
    id_procedimiento,
    id_procedimientoAdicional,
    fecha,
  }();
};

export const getTurnos = async (req, res) => {
  try {
    const turnos = await turnoModel.find();
    res.status(200).json(turnos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTurno = async (req, res) => {
  const { id } = req.params;
  try {
    const turno = await turnoModel.findById(id);
    res.status(200).json(cliente);
  } catch {
    res.status(404).json({ message: error.message });
  }
};

export const updateTurno = async (req, res) => {
  const { id } = req.params;
  const { id_cliente, id_procedimiento, id_procedimientoAdicional, fecha } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No se encontró turno con ID ${id}.`);

  const updatedTurno = {
    id_cliente,
    id_procedimiento,
    id_procedimientoAdicional,
    fecha,
  };
  await turnoModel.findByIdAndUpdate(id, updatedTurno, { new: true });

  res.json(updatedTurno);
};

// Remover turno (soft delete)

// Eliminar turno (hard delete)
