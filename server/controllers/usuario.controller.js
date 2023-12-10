import usuarioModel from "../models/usuario.model.js";

export const getSingleUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.findById(id);
    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
  }
};
