import express from "express";
import {
  getSolicitud,
  getSolicitudes,
  createSolicitud,
  updateSolicitud,
} from "../controllers/solicitudes";
import {
  getCliente,
  getClientes,
  createCliente,
  updateCliente,
} from "../controllers/clientes";
import {
  getProcedimiento,
  getProcedimientos,
  createProcedimiento,
  updateProcedimiento,
} from "./../controllers/procedimientos";
import {
  getSolicitud,
  getSolicitudes,
  createSolicitud,
  updateSolicitud,
} from "../controllers/solicitudes";
import {
  getTurno,
  getTurnos,
  createTurno,
  updateTurno,
} from "./../controllers/turnos";

const router = express.Router();

/*---SOLICITUDES---*/
router.get("/", getSolicitudes);
//router.get("/:id", getSolicitud);
router.post("/", createSolicitud);
router.patch("/:id", updateSolicitud);
// router.delete("/:id", deleteSolicitud);

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
//router.get("/:id", getTurno);
router.post("/", createTurno);
router.patch("/:id", updateTurno);
// router.delete("/:id", deleteTurno);

export default router;
