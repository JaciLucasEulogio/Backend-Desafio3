const express = require("express");
const ProductManager = require("./ProductManager");
const app = express();
const port = 8080;

const productManager = new ProductManager("products.json");

app.get("/", (req, res) => {
  const allProductsLink = "http://localhost:8080/products";
  const first5ProductsLink = "http://localhost:8080/products?limit=5";
  const secondProductLink = "http://localhost:8080/products/2";
  const nonExistentProductLink = "http://localhost:8080/products/34123123";

  const links = {
    allProducts: allProductsLink,
    first5Products: first5ProductsLink,
    secondProduct: secondProductLink,
    nonExistentProduct: nonExistentProductLink,
  };

  res.json({ message: "Jaci Lucas Eulogio", links });
});

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  let productsToSend = productManager.getProducts();

  if (limit) {
    const parsedLimit = parseInt(limit, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      productsToSend = productsToSend.slice(0, parsedLimit);
    }
  }

  res.json(productsToSend);
});

app.get("/products/:pid", (req, res) => {
  const productId = parseInt(req.params.pid, 10);

  if (!isNaN(productId)) {
    const product = productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } else {
    res.status(400).json({ error: "ID de producto no válido" });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
