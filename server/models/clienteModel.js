import mongoose from "mongoose";

const clienteSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true },
    apellido: { type: String, trim: true, required: true },
    contacto: { type: String, required: true },
    correo: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Correo no valido"],
      index: true,
      required: true,
    },
    estado: { type: Boolean, default: 1 },
  },
  { timestamps: true }
);

export const clienteModel = mongoose.model("Cliente", { name: string });
