import express from "express";
import { login, registerSec, verification, authorize } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(registerSec);
router.route("/verification").post(verification);
router.route("/novaUAuth").post(authorize);

export default router;
