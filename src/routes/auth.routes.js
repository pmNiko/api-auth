// ----- Rutas para validación y alta de usuarios ----//
import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth.controller";

router.post("/signup", authController.singup);
router.post("/signin", authController.singin);

export default router;
