import { Router } from "express";
import productRouters from "../routes/products.routes.js"
import cartsRouters from "../routes/carts.routes.js"
import sessionRouters from "../routes/session.routes.js"
import { isLogin } from "../middlewares/islogin.middleware.js";


// Configuracion de Endpoints
const router = Router();
router.use("/products", isLogin, productRouters)
router.use("/carts", cartsRouters)
router.use("/session", sessionRouters)


export default router;