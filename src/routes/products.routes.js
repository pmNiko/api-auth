// importación del controlador de products
import * as productsController from "../controllers/products.controller";

import { Router } from "express";

// creación del router de express
const router = Router();

// ------ Rutas de productos ------- //

router.post("/", productsController.createProduct); // -> crear

router.get("/", productsController.getProducts); // -> ver todos

router.get("/:id", productsController.getProduct); // -> buscar uno

router.put("/:id", productsController.updateProduct); // -> actualizar

router.delete("/:id", productsController.deleteProduct); // -> eliminar

export default router;
