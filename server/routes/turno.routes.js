import express from "express";
import {
  createTurno,
  getAllTurnos,
  getSingleTurno,
  updateTurno,
  deleteTurno,
  getTopBuyers,
  getTurnosByExtra,
  getTopServices
} from "./../controllers/turno.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/filterget").get(authenticateUser, getTurnosByExtra);
router.route("/:id").patch(authenticateUser, updateTurno);
router.route("/turno/:id").get(authenticateUser, getSingleTurno);
router.route("/topbuyer").get(authenticateUser, getTopBuyers);
router.route("/topservice").get(authenticateUser, getTopServices);
router.route("/:id").delete(authenticateUser, deleteTurno);
router.route("/").post(authenticateUser, createTurno);
router.route("/").get(authenticateUser, getAllTurnos);

export default router;
