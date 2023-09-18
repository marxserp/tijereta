import mongoose from "mongoose";

const turnoSchema = mongoose.Schema(
  {
    id_cliente: String,
    id_procedimiento: String,
    id_procedimientoAdicional: String,
    fecha: Date,
    estado: { type: Boolean, default: 1 },
  },
  { timestamps: true }
);

const turnoModel = mongoose.model("Turno", turnoSchema);

export default turnoModel;
