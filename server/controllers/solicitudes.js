import mongoose from "mongoose";
import solicitudModel from "./../models/solicitudModel";

export const createSolicitud = async (req, res) => {
  const {
    contacto_solic,
    contacto_adicional_solic,
    correo_solic,
    nombre_solic,
    apellido_solic,
    procedimiento,
    procedimiento_adic,
  } = req.body;
  const newSolicitud = new solicitudModel({
    contacto_solic,
    contacto_adicional_solic,
    correo_solic,
    nombre_solic,
    apellido_solic,
    procedimiento,
    procedimiento_adic,
  });
  try {
    await newSolicitud.save();
    res.status(201).json(newSolicitud);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await solicitudModel.find();
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSolicitud = async (req, res) => {
  const { id } = req.params;
  try {
    const solicitud = await solicitudModel.findById(id);
    res.status(200).json(solicitud);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSolicitud = async (req, res) => {
  const { id } = req.params;
  const {
    contacto_solic,
    contacto_adicional_solic,
    correo_solic,
    nombre_solic,
    apellido_solic,
    procedimiento,
    procedimiento_adic,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No hay un solicitud con ID ${id}.`);

  const updatedSolicitud = {
    contacto_solic,
    contacto_adicional_solic,
    correo_solic,
    nombre_solic,
    apellido_solic,
    procedimiento,
    procedimiento_adic,
    _id: id,
  };
  await solicitudModel.findByIdAndUpdate(id, updatedSolicitud, { new: true });

  res.json(updatedSolicitud);
};

// Remover solicitud (soft delete)

// Eliminar solicitud (hard delete)
