import express from "express";

import {
  createTurno,
  getAllTurnos,
  getSingleTurno,
  updateTurno,
  deleteTurno,
} from "./../controllers/turno.controller.js";

const router = express.Router();

// router.route("/search").get(searchTurno);
router.route("/:id").patch(updateTurno);
router.route("/:id").get(getSingleTurno);
router.route("/:id").delete(deleteTurno);
router.route("/").post(createTurno);
router.route("/").get(getAllTurnos);

export default router;
