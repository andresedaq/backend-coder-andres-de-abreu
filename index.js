const fs = require('fs')


let pathFile = "./data/products.json"
let products = [];

const addProducts = async (title, description, price, thumbnail, code, stock) => {
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

  await fs.promises.writeFile(pathFile,JSON.stringify(products))
};

const getProducts = async () => {

  const productsJson = await fs.promises.readFile(pathFile, "utf8")
  products = JSON.parse(productsJson) || []
};

const getProductsById = async (id) => {
    await getProducts()
    const product = products.find(product => product.id === id)
    if(!product) {
      console.log(`Could not find the product with ID ${id}`);
      return;
    }

    console.log(product);
    return product
};

const updateProduct = async(id, dataProduct) => {
  await getProducts();
  const index = products.findIndex(product => product.id === id)
  products[index] = {
    ...products[index],
    ...dataProduct
  }
  await fs.promises.writeFile(pathFile, JSON.stringify(products))
}

const deleteProduct = async (id) => {
  await getProducts();
  products = products.filter( product => product.id !== id ) 
  await fs.promises.writeFile(pathFile, JSON.stringify(products))
}

// addProducts("Samsung Galaxy S21", "A flagship smartphone with top-of-the-line features.", 999, "s21-thumbnail.jpg", "S21", 10);
// addProducts("Samsung Galaxy A52", "A mid-range smartphone with a high-quality camera.", 399, "a52-thumbnail.jpg", "A52", 15);
// addProducts("Samsung Galaxy Note 20", "A premium smartphone with a stylus and powerful performance.", 899, "note20-thumbnail.jpg", "Note20", 8);
// addProducts("Samsung Galaxy Fold", "A foldable smartphone with innovative design and technology.", 1999, "fold-thumbnail.jpg", "Fold", 5);
// addProducts("Samsung Galaxy S20 FE", "A budget-friendly smartphone with flagship-level features.", 599, "s20fe-thumbnail.jpg", "S20FE", 12);

// // getProducts();
// getProductsById(2);

// updateProduct(1 , {"id": 1,
// "title": "Samsung Galaxy S23"})

deleteProduct(1)