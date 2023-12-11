import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true, min: 2, max: 50 },
    apellido: { type: String, trim: true, required: true, min: 2, max: 50 },
    correo: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      match: [/\S+@\S+\.\S+/, "Correo no valido"],
      index: true,
      max: 75,
    },
    contrasena: { type: String, required: true, min: 8 },
  },
  { timestamps: true }
);

const usuarioModel = mongoose.model("Usuario", usuarioSchema);

export default usuarioModel;
