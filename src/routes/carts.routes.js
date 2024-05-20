import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js"

const router = Router();

router.post("/", async (req, res) => {
    try {
        const cart = cartDao.create();

        res.status(201).json({status: "success", payload: cart})
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const {cid, pid} = req.params
        const cart = await cartManager.createCarts() 
        res.status(201).json(cart)

    } catch (error) {
        console.log(error)
    }
})

router.get("/:cid", async (req, res) => {
    try {  
        const {cid} = req.params;
        const cart = await cartDao.getById(cid);
        if (!cart) return res.status(404).json({status: "Error", msg: "No se encontro"})

        res.status(200).json({status: "success", payload: cart})
    } catch (error) {
        console.log(error)
    }
})


export default router;