import mongoose from "mongoose";

const procedimientoSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true },
    descripcion: String,
    tipo: { type: Boolean, default: 1, required: true },
    duracion: { type: Number, required: true },
    precio: { type: Number, default: 0, required: true },
    estado: { type: Boolean, default: 1, required: true },
  },
  { timestamps: true }
);

export const procedimientoModel = mongoose.model("Procedimiento", {
  name: string,
});
