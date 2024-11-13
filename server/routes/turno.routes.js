import express from "express";

import {
  createTurno,
  getAllTurnos,
  getSingleTurno,
  updateTurno,
  deleteTurno,
} from "./../controllers/turno.controller.js";

const router = express.Router();

router.route("/").post(createTurno);
router.route("/").get(getAllTurnos);
router.route("/:id").get(getSingleTurno);
router.route("/:id").patch(updateTurno);
router.route("/:id").patch(deleteTurno);

export default router;
