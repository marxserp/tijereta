import express from "express";
import {
  createProducto,
  getAllProductos,
  getSingleProducto,
  updateProducto,
  deleteProducto,
  searchProducto,
} from "../controllers/producto.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/search").get(authenticateUser, searchProducto);
router.route("/:id").patch(authenticateUser, updateProducto);
router.route("/:id").delete(authenticateUser, deleteProducto);
router.route("/:id").get(authenticateUser, getSingleProducto);
router.route("/").post(authenticateUser, createProducto);
router.route("/").get(authenticateUser, getAllProductos);

export default router;
