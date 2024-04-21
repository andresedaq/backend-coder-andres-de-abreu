import express from "express";
import fs from "fs";

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const readProductsFromFile = () => {
  try {
    const productsData = fs.readFileSync("./data/products.json", "utf8");
    return JSON.parse(productsData) || [];
  } catch (error) {
    console.error("Error reading products file:", error);
    return [];
  }
};


app.get("/products", (req, res) => {
  try {
    let products = readProductsFromFile();

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

app.get("/products/:pid", (req, res) => {
  try {
    const productId = req.params.pid;

    const products = readProductsFromFile();


    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    return res.json({ status: 200, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ status: 500, error: error.message });
  }
});

const server = app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

export default server;
