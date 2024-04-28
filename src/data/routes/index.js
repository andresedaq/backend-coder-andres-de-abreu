import { Router } from "express";
import productRouters from "./products.routes.js"
import cartsRouters from "./carts.routes.js"

// Configuracion de Endpoints
const router = Router();
router.use("/products", productRouters)
router.use("/carts", cartsRouters)

export default router;