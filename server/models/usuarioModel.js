import mongoose from "mongoose";
var uniqueValidator = require("mongoose-unique-validator");
var crypto = require("crypto");

const usuarioSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true },
    apellido: { type: String, trim: true, required: true },
    usuario: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      match: [/^[a-zA-Z0-9]+$/, "Nombre de usuario no valido"],
      index: true,
    },
    correo: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      match: [/\S+@\S+\.\S+/, "Correo no valido"],
      index: true,
    },
    contrasena: String,
    sal: String,
  },
  { timestamps: true }
);

usuarioSchema.plugin(uniqueValidator, {
  message: "Este nombre ya se encuentra reservado",
});

const usuarioModel = mongoose.model("Usuario", usuarioSchema);

export default usuarioModel;
