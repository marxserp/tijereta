import express from "express";

import {
  createProducto,
  getAllProductos,
  getSingleProducto,
  updateProducto,
  deleteProducto,
  searchProducto,
} from "../controllers/producto.controller.js";

const router = express.Router();

router.route("/search").get(searchProducto);
router.route("/:id").patch(updateProducto);
router.route("/:id").delete(deleteProducto);
router.route("/:id").get(getSingleProducto);
router.route("/").post(createProducto);
router.route("/").get(getAllProductos);

export default router;
