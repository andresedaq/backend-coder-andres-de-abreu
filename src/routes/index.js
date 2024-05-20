import { Router } from "express";
import productRouters from "../routes/products.routes.js"
import cartsRouters from "../routes/carts.routes.js"

// Configuracion de Endpoints
const router = Router();
router.use("/products", productRouters)
router.use("/carts", cartsRouters)

export default router;