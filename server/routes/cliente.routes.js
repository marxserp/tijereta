import express from "express";

import {
  createCliente,
  getAllClientes,
  getSingleCliente,
  updateCliente,
} from "./../controllers/cliente.controller.js";

const router = express.Router();

router.route("/").post(createCliente);
router.route("/").get(getAllClientes);
router.route("/:id").get(getSingleCliente);
router.route("/:id").patch(updateCliente);
// router.route("/:id").patch(deleteCliente);

export default router;
