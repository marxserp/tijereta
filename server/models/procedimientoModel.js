import mongoose from "mongoose";

const procedimientoSchema = mongoose.Schema({
  nombre: { type: String, trim: true, required: true },
  descripcion: String,
  duracion: Number,
  precio: { type: Number, default: 0 },
  estado: { type: Boolean, default: 1 },
});

const procedimientoModel = mongoose.model("Procedimiento", procedimientoSchema);

export default procedimientoModel;
