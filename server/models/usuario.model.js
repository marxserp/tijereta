import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true, min: 2, max: 50 },
    apellido: { type: String, trim: true, required: true, min: 2, max: 50 },
    correo: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Correo no válido"],
      index: true,
      max: [75, "Correo excede límite de caracteres"],
    },
    contrasena: { type: String, required: true, min: [8, "Contraseña no cumple mínimo de 8 caracteres"] },
    codigo: { type: String, required: true, min: [6, "Código no cumple mínimo de 6 caracteres"] },
    estado: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

const usuarioModel = mongoose.model("Usuario", usuarioSchema);

export default usuarioModel;
