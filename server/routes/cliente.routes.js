import express from "express";

import {
  createCliente,
  getAllClientes,
  getSingleCliente,
  updateCliente,
  deleteCliente,
  searchClientes,
} from "./../controllers/cliente.controller.js";

const router = express.Router();

router.route("/search").get(searchClientes);
router.route("/:id").patch(updateCliente);
router.route("/:id").get(getSingleCliente);
router.route("/:id").delete(deleteCliente);
router.route("/").post(createCliente);
router.route("/").get(getAllClientes);

export default router;
