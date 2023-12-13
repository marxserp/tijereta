import mongoose from "mongoose";

const procedimientoSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true },
    descripcion: String,
    tipo: { type: Boolean, default: 1 },
    duracion: { type: String, trim: true },
    precio: { type: String, default: 0 },
    usuario: { type: String, default: "0" },
    estado: { type: Boolean, default: 1 },
  },
  { timestamps: true }
);

const procedimientoModel = mongoose.model("Procedimiento", procedimientoSchema);

export default procedimientoModel;
