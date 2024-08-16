import express from "express";
import mongoose from "mongoose";
import turnoModel from "../models/turno.model.js";

export const createTurno = async (req, res) => {
  const {
    fecha,
    id_cliente,
    id_procedimiento,
    detalle,
    sena,
    observacion,
    estado,
    extra,
  } = req.body;
  const newCliente = new {
    fecha,
    id_cliente,
    id_procedimiento,
    detalle,
    sena,
    observacion,
    estado,
    extra,
  }();
};

export const getAllTurnos = async (req, res) => {
  try {
    const turnos = await turnoModel.find();
    res.status(200).json(turnos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleTurno = async (req, res) => {
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
  const {
    fecha,
    id_cliente,
    id_procedimiento,
    detalle,
    sena,
    observacion,
    estado,
    extra,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No se encontró turno con ID ${id}.`);

  const updatedTurno = {
    fecha,
    id_cliente,
    id_procedimiento,
    detalle,
    sena,
    observacion,
    estado,
    extra,
  };
  await turnoModel.findByIdAndUpdate(id, updatedTurno, { new: true });

  res.json(updatedTurno);
};

export const deleteTurno = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No existe ningún turno de ID ${id}`);

  await turnoModel.findByIdAndRemove(id);
  res.json({ message: "Turno eliminado." });
};
