// importación del controlador de products
import * as productsController from "../controllers/products.controller";
import { authJwt } from "../middlewares";

import { Router } from "express";

// creación del router de express
const router = Router();

// ------ Rutas de productos ------- //

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  productsController.createProduct
); // -> crear

router.get("/", productsController.getProducts); // -> ver todos

router.get("/:id", productsController.getProduct); // -> buscar uno

router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsController.updateProduct
); // -> actualizar

router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsController.deleteProduct
); // -> eliminar

export default router;
