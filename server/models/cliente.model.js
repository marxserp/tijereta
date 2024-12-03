import mongoose from "mongoose";

const clienteSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true, min: 2, max: 50 },
    apellido: { type: String, trim: true, required: true, min: 2, max: 50 },
    fechaNacimiento: { type: Date },
    direccion: { type: String, trim: true, max: [120, "Dirección excede límite de caracteres"] },
    correo: { type: String, lowercase: true, trim: true, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Correo no válido"], max: [75, "Correo excede límite de caracteres"], },
    contacto: { type: String, required: true, match: [/^(11|\d{3,4})\d{6,8}$/, "Contacto no válido"] },
    observacion: { type: String, max: [200, "Detalles excede límite de caracteres"] },
    estado: { type: Boolean, required: true, default: true },
    usuario: { type: String, required: true },
  },
  { timestamps: true }
);

const clienteModel = mongoose.model("Cliente", clienteSchema);

export default clienteModel;
