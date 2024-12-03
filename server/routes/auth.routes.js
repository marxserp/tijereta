import express from "express";
import { login, registerSec, verification, authorize, getSingleUsuario } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(registerSec);
router.route("/verification").post(verification);
router.route("/novaUAuth").post(authorize);
router.route("/usuario/:id").get(authenticateUser, getSingleUsuario);

export default router;
