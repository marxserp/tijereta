import mongoose from "mongoose";
import turnoModel from "../models/turno.model.js";

export const createTurno = async (req, res) => {
  const { fecha, id_cliente, id_producto, id_producto2, id_producto3, sena, monto, promo, total, detalle, observacion, extra, estado } = req.body;
  try {
    const newTurno = new turnoModel({
      fecha,
      id_cliente,
      id_producto,
      id_producto2,
      id_producto3,
      sena,
      monto,
      promo,
      total,
      detalle,
      observacion,
      extra,
      estado,
      usuario: req.user.id

    });
    await newTurno.save();
    res.status(201).json(newTurno)
  } catch (error) {
    res.status(500).json({ message: `Error de controlador al registrar un turno: ${error.message}`, });
  }
};

export const getAllTurnos = async (req, res) => {
  try {
    const userId = req.user.id;
    const turnos = await turnoModel.find({ usuario: userId });
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
  const { fecha, id_cliente, id_producto, id_producto2, id_producto3, sena, monto, promo, total, detalle, observacion, extra, estado, } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No se encontró turno con ID ${id}.`);
  const turno = await turnoModel.findById(id);
  if (!turno || turno.usuario.toString() !== req.user.id) {
    return res.status(403).send("Sin autorización para actualizar cliente");
  }
  const updatedTurno = {
    fecha,
    id_cliente,
    id_producto,
    id_producto2,
    id_producto3,
    sena,
    monto,
    promo,
    total,
    detalle,
    observacion,
    extra,
    estado,
    _id: id,
  };
  await turnoModel.findByIdAndUpdate(id, updatedTurno, { new: true });

  res.json(updatedTurno);
};

export const getTopBuyers = async (req, res) => {
  const userId = req.user.id;
  try {
    const filtros = [
      { $match: { estado: true, usuario: userId } },
      { $group: { _id: "$id_cliente", count: { $sum: 1 } } }, // Agrupar x cliente y contar turnos
      { $sort: { count: -1 } },
      { $limit: 3 }, // Trae top 3
    ];
    const topBuyers = await turnoModel.aggregate(filtros);

    if (topBuyers.length === 0) {
      return res.status(404).json({ message: "No hay turnos activos" });
    }

    res.status(200).json(topBuyers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTurnosByExtra = async (req, res) => {
  const { query } = req.body;
  const userId = req.user.id;
  try {
    const consultaRecortada = query.trim();
    if (!consultaRecortada) {
      return res.json([]);
    }
    const turnosFiltered = await turnoModel.find({
      $match: { extra: query, estado: true, usuario: userId }
    });
    res.status(200).json(turnosFiltered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTurno = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No existe ningún turno de ID ${id}`);
  await turnoModel.findByIdAndRemove(id);
  res.json({ message: "Turno eliminado." });
};
