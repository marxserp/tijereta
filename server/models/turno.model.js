import mongoose from "mongoose";

const turnoSchema = mongoose.Schema(
  {
    fecha: { type: Date, required: true },
    id_cliente: { type: String, required: true },
    id_producto: { type: String, required: true },
    detalle: { type: String, required: true },
    sena: { type: Number, default: 1 },
    observacion: { type: String, required: true },
    estado: { type: Boolean, default: 1 },
    extra: { type: Number, default: 1 },
    usuario: { type: String, required: true },
  },
  { timestamps: true }
);

const turnoModel = mongoose.model("Turno", turnoSchema);

export default turnoModel;
