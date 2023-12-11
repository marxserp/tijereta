import mongoose from "mongoose";

const clienteSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true },
    apellido: { type: String, trim: true },
    correo: {
      type: String,
      lowercase: true,
      trim: true,
    },
    contacto: { type: String },
    usuario: { type: String, default: "0" },
    estado: { type: Boolean, default: 1 },
  },
  { timestamps: true }
);

const clienteModel = mongoose.model("Cliente", clienteSchema);

export default clienteModel;
