// ----- Rutas para validación y alta de usuarios ----//
import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth.controller";
import { verifySingup } from "../middlewares";

router.post(
  "/signup",
  [verifySingup.checkRolesExisted, verifySingup.checkDuplicateUser],
  authController.singup
);
router.post("/signin", authController.singin);

export default router;
