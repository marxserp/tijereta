import express from "express";
import {
  createCliente,
  getAllClientes,
  getSingleCliente,
  updateCliente,
  deleteCliente,
  searchClientes,
} from "../controllers/cliente.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/search").get(authenticateUser, searchClientes);
router.route("/:id").patch(authenticateUser, updateCliente);
router.route("/:id").get(authenticateUser, getSingleCliente);
router.route("/:id").delete(authenticateUser, deleteCliente);
router.route("/").post(authenticateUser, createCliente);
router.route("/").get(authenticateUser, getAllClientes);

export default router;

