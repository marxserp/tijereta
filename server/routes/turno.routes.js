import express from "express";
import {
  createTurno,
  getAllTurnos,
  getSingleTurno,
  updateTurno,
  deleteTurno,
  getTopBuyers,
  getTurnosByExtra,
} from "./../controllers/turno.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/filterget").get(authenticateUser, getTurnosByExtra);
router.route("/:id").patch(authenticateUser, updateTurno);
router.route("/:id").get(authenticateUser, getSingleTurno);
router.route("/top").get(authenticateUser, getTopBuyers);
router.route("/:id").delete(authenticateUser, deleteTurno);
router.route("/").post(authenticateUser, createTurno);
router.route("/").get(authenticateUser, getAllTurnos);

export default router;
