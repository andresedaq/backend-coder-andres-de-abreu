import fs from "fs";

let pathFile = "./data/products.json";
let products = [];

const create = async (title, description, price, thumbnail, code, stock) => {
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    };

    if (Object.values(newProduct).includes(undefined)) {
        console.log("All information is required");
        return;
    }

    const productExists = products.find((product) => product.code === code);
    if (productExists) {
        console.log(`This product ${title}, with the code ${code} already exists.`);
        return;
    }

    products.push(newProduct);

    try {
        await fs.promises.writeFile(pathFile, JSON.stringify(products));
        console.log("Product added successfully!");
    } catch (error) {
        console.error("Error writing to file:", error);
    }
};

const read = async () => {
    try {
        const productsJson = await fs.promises.readFile(pathFile, "utf8");
        products = JSON.parse(productsJson) || [];
    } catch (error) {
        console.error("Error reading file:", error);
    }
};

const readId = async (id) => {
    await read();
    const product = products.find((product) => product.id === id);
    if (!product) {
        console.log(`Could not find the product with ID ${id}`);
        return;
    }

    console.log(product);
    return product;
};

const update = async (id, dataProduct) => {
    await read();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        console.log(`Product with ID ${id} not found`);
        return;
    }

    products[index] = {
        ...products[index],
        ...dataProduct,
    };

    try {
        await fs.promises.writeFile(pathFile, JSON.stringify(products));
        console.log("Product updated successfully!");
    } catch (error) {
        console.error("Error writing to file:", error);
    }
};

const destroy = async (id) => {
    await read();
    const filteredProducts = products.filter((product) => product.id !== id);
    if (filteredProducts.length === products.length) {
        console.log(`Could not find the product with ID ${id}`);
        return;
    }

    products = filteredProducts;

    try {
        await fs.promises.writeFile(pathFile, JSON.stringify(products));
        console.log("Product deleted successfully!");
    } catch (error) {
        console.error("Error writing to file:", error);
    }
};

create("Samsung Galaxy Note 20", "A premium smartphone with a stylus and powerful performance.", 899, "note20-thumbnail.jpg", "Note20", 8);
create("Samsung Galaxy Fold", "A foldable smartphone with innovative design and technology.", 1999, "fold-thumbnail.jpg", "Fold", 5);
create("Samsung Galaxy S20 FE", "A budget-friendly smartphone with flagship-level features.", 599, "s20fe-thumbnail.jpg", "S20FE", 12);
create("Samsung Galaxy S27 FE", "A budget-friendly smartphone with flagship-level features.", 599, "s20fe-thumbnail.jpg", "S20FE", 12);

// // read();
// readId(2);

// update(1 , {"id": 1,
// "title": "Samsung Galaxy S23"})

// destroy(1);
