import mongoose from "mongoose";

const turnoSchema = mongoose.Schema(
  {
    fecha: { type: Date, required: true },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cliente",
    },
    procedimiento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Procedimiento",
    },
    sena: { type: Number, default: 1 },
    detalle: { type: String, required: true },
    observacion: { type: String, required: true },
    estado: { type: Number, default: 1 },
    extra: { type: Boolean, default: 1 },
    usuario: { type: String, required: true },
  },
  { timestamps: true }
);

const turnoModel = mongoose.model("Turno", turnoSchema);

export default turnoModel;
