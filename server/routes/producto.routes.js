import express from "express";

import {
  createProducto,
  getAllProductos,
  getSingleProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/producto.controller.js";

const router = express.Router();

router.route("/").post(createProducto);
router.route("/").get(getAllProductos);
router.route("/:id").get(getSingleProducto);
router.route("/:id").patch(updateProducto);
router.route("/:id").delete(deleteProducto);

export default router;
