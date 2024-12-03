import mongoose from "mongoose";

const turnoSchema = mongoose.Schema(
  {
    fecha: { type: Date, required: true },
    id_cliente: { type: String, required: true },
    id_producto: { type: String, required: true },
    id_producto2: { type: String },
    id_producto3: { type: String },
    sena: { type: Number, required: true, default: 0 },
    monto: { type: Number, required: true, default: 0 },
    promo: { type: Number, required: true, default: 0 },
    total: { type: Number, default: 0 },
    detalle: { type: String },
    observacion: { type: String },
    extra: { type: String, required: true, default: "Activo" },
    estado: { type: Boolean, required: true, default: 1 },
    usuario: { type: String, required: true, required: true },
  },
  { timestamps: true }
);

const turnoModel = mongoose.model("Turno", turnoSchema);

export default turnoModel;
