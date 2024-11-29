import mongoose from "mongoose";
import productoModel from "../models/producto.model.js";

export const createProducto = async (req, res) => {
  const { nombre, descripcion, duracion, precio, usuario } = req.body;
  try {
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
      message: `Error de controlador al crear un producto: ${error.message}`,
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
  const { id } = req.params;
  const { nombre, duracion, precio } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay un producto con ID ${id}.`);

    const updatedProducto = { nombre, duracion, precio };
    await productoModel.findByIdAndUpdate(id, updatedProducto, { new: true });
    res.json(updatedProducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Remover producto (soft delete)
export const removeProducto = async (req, res) => {
  const { id } = req.params;
  const { status = 0 } = req.body; // Default a 0 si valor de status no es provisto
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay un producto con ID ${id}.`);
    const removedProducto = await productoModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!removedProducto) return res.status(404).send(`No hay un producto con ID ${id}.`);
    res.json(removedProducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchProducto = async (req, res) => {
  const { query, limit = 10 } = req.query;
  try {
    const productos = await productoModel.find({
      nombre: { $regex: query, $options: "i" }
    }).limit(Number(limit));
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar producto, desfazar
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No hay productos con ID ${id}`);
  await productoModel.findByIdAndRemove(id);
  res.json({ message: "Producto eliminado" });
};
