import mongoose from "mongoose";

const turnoSchema = mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
    },
    procedimiento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Procedimiento",
    },
    procedimientoAdicional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Procedimiento",
    },
    fecha: { type: Date, required: true },
    detalle: { type: String, required: true },
    observacion: { type: String, required: true },
    usuario: { type: String, required: true },
    estado: { type: Boolean, default: 1 },
  },
  { timestamps: true }
);

const turnoModel = mongoose.model("Turno", turnoSchema);

export default turnoModel;
