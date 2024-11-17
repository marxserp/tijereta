import mongoose from "mongoose";
import productoModel from "../models/producto.model.js";

export const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, duracion, precio, usuario } = req.body;
    const newProducto = new productoModel({
      nombre,
      descripcion,
      duracion,
      precio,
      usuario,
    });
    await newProducto.save();
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({
      message: `Error de controlador al registrar un cliente: ${error.message}`,
    });
  }
};

export const getAllProductos = async (req, res) => {
  try {
    const productos = await productoModel.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await productoModel.findById(id);
    res.satus(200).json(producto);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, duracion, precio } = req.body;
    console.log(
      "Log from producto.controller.js/updateProducto",
      id,
      nombre,
      duracion,
      precio,
      req.body
    );

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No hay un producto con ID ${id}.`);

    const updatedProducto = { nombre, duracion, precio };
    await productoModel.findByIdAndUpdate(id, updatedProducto, {
      new: true,
    });

    res.json(updatedProducto);
  } catch (error) {
    console.log(error);
  }
};

// Remover producto (soft delete)

// Eliminar producto (hard delete)

export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay productos con ID ${id}`);
  await productoModel.findByIdAndRemove(id);
  res.json({ message: "Producto eliminado" });
};
