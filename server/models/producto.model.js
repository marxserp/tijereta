import mongoose from "mongoose";

const productoSchema = mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    detalle: { type: String, trim: true, max: [200, "Detalles excede límite de caracteres"] },
    precio: { type: String, required: true, default: 0 },
    promo: { type: String, default: 0 },
    duracion: { type: Number, required: true, default: 0 },
    estado: { type: Boolean, default: 1 },
    usuario: { type: String, required: true },
  },
  { timestamps: true }
);

const productoModel = mongoose.model("Producto", productoSchema);

export default productoModel;
