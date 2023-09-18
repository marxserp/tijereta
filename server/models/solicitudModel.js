import mongoose from "mongoose";

const solicitudSchema = mongoose.Schema(
  {
    contacto_solic: { type: String, required: true },
    contacto_adicional_solic: Number,
    correo_solic: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Correo no valido"],
      index: true,
    },
    nombre_solic: { type: String, trim: true, required: true },
    apellido_solic: { type: String, trim: true, required: true },
    procedimiento: { type: String, required: true },
    procedimiento_adic: String,
    estado: { type: Boolean, default: 1 },
  },
  { timestamp: true }
);

const solicitudModel = mongoose.model("Solicitud", solicitudSchema);

export default solicitudModel;
