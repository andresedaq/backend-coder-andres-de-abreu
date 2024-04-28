import { Router } from "express";
import productManager from "../../managers/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    await productManager.read(); 
    let products = productManager.products; 
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    if (limit) {
      products = products.slice(0, limit);
    }

    return res.json({ status: 200, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ status: 500, error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    await productManager.read(); 
    const product = productManager.products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    return res.json({ status: 200, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ status: 500, error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body
    const newProduct = await productManager.create(product)
    res.status(201).json(newProduct)

  } catch (error) {
    console.log(error)

  }
})

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const product = req.body
    const updateProduct = await productManager.update(pid, product)
    res.status(201).json(newProduct)

  } catch (error) {
    console.log(error)

  }
})

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    await productManager.delete(pid)
    res.status(201).json({ message: "Product deleted" })

  } catch (error) {
    console.log(error)

  }
})

export default router;
