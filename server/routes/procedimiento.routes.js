import express from "express";

import {
  createProcedimiento,
  getAllProcedimientos,
  getSingleProcedimiento,
  updateProcedimiento,
  deleteProcedimiento,
} from "./../controllers/procedimiento.controller.js";

const router = express.Router();

router.route("/").post(createProcedimiento);
router.route("/").post(getAllProcedimientos);
router.route("/:id").get(getSingleProcedimiento);
router.route("/:id").patch(updateProcedimiento);
router.route("/:id").patch(deleteProcedimiento);

export default router;
