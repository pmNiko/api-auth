import { Router } from "express";

const router = Router();

import * as userController from "../controllers/user.controller";
import { authJwt, verifySingup } from "../middlewares";

router.post(
  "/",
  [authJwt.verifyToken, verifySingup.checkRolesExisted, authJwt.isAdmin],
  userController.createUser
);

export default router;
