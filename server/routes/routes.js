import express from "express";
import {
  getCliente,
  getClientes,
  createCliente,
  updateCliente,
} from "../controllers/cliente.controller";
import {
  getProcedimiento,
  getProcedimientos,
  createProcedimiento,
  updateProcedimiento,
} from "./../controllers/procedimiento.controller";
import {
  getTurno,
  getTurnos,
  createTurno,
  updateTurno,
} from "./../controllers/turno.controller";

const router = express.Router();

/*---CLIENTES---*/
router.get("/", getClientes);
//router.get("/:id", getCliente);
router.post("/", createCliente);
router.patch("/:id", updateCliente);
// router.delete("/:id", deleteCliente);

/*---PROCEDIMIENTOS---*/
router.get("/", getProcedimientos);
//router.get("/:id", getProcedimiento);
router.post("/", createProcedimiento);
router.patch("/:id", updateProcedimiento);
// router.delete("/:id", deleteProcedimientos);

/*---TURNOS---*/
router.get("/", getTurnos);
router.get("/:id", getTurno);
router.post("/", createTurno);
router.patch("/:id", updateTurno);
// router.delete("/:id", deleteTurno);

export default router;
