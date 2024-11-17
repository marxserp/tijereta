import mongoose from "mongoose";
import turnoModel from "../models/turno.model.js";

export const createTurno = async (req, res) => {
  try {
    const {
      fecha,
      id_cliente,
      id_producto,
      detalle,
      sena,
      observacion,
      estado,
      extra,
      usuario
    } = req.body;
    const newTurno = new turnoModel({
      fecha,
      id_cliente,
      id_producto,
      detalle,
      sena,
      observacion,
      estado,
      extra,
      usuario
    });
    await newTurno.save();
    res.status(201).json(newTurno)
  } catch (error) {
    res.status(500).json({ message: `Error de controlador al registrar un turno: ${error.message}`, });
  }
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
    id_producto,
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
    id_producto,
    detalle,
    sena,
    observacion,
    estado,
    extra,
    _id: id,
  };
  await turnoModel.findByIdAndUpdate(id, updatedTurno, { new: true });

  res.json(updatedTurno);
};

export const deleteTurno = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No existe ningún turno de ID ${id}`);
  await turnoModel.findByIdAndRemove(id);
  res.json({ message: "Turno eliminado." });
};
