const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.currentId = 1;

    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
      const lastProduct = this.products[this.products.length - 1];
      if (lastProduct) {
        this.currentId = lastProduct.id + 1;
      }
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf8");
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const { code, title, description, price, thumbnail, stock } = product;

    if (!code || !title || isNaN(price) || isNaN(stock)) {
      console.log(
        "Todos los campos son obligatorios y price/stock deben ser números."
      );
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log(`Producto con el código ${code} ya existe.`);
      return;
    }

    const newProduct = {
      id: this.currentId,
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
    };

    this.products.push(newProduct);
    this.currentId++;

    this.saveProducts();
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado.");
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
      };
      this.saveProducts();
    } else {
      console.log("Producto no encontrado.");
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProducts();
    } else {
      console.log("Producto no encontrado.");
    }
  }
}

module.exports = ProductManager;

// const productManager = new ProductManager("products.json");

// productManager.addProduct({
//   code: "1",
//   title: "Mouse",
//   description: "Un mouse de alta precisión",
//   price: 100,
//   thumbnail: "mouse.jpg",
//   stock: 20,
// });

// productManager.addProduct({
//   code: "2",
//   title: "Teclado",
//   description: "Teclado mecánico con retroiluminación",
//   price: 150,
//   thumbnail: "keyboard.jpg",
//   stock: 15,
// });

/*  APARTADO DE PRUEBAS DE LOS MÉTODOS   */

// console.log(productManager.getProducts());

// console.log(productManager.getProductById(1));

// productManager.updateProduct(1, { price: 120, stock: 25 });

// productManager.deleteProduct(2);

// productManager.addProduct('1', 'Mouse', 'Un mouse de alta precisión', 100, 'mouse.jpg', 20);
// productManager.addProduct('2', 'Teclado', 'Teclado mecánico con retroiluminación', 150, 'keyboard.jpg', 15);
// productManager.addProduct('1', 'Producto Duplicado', 'Este producto ya existe', 200, 'duplicate.jpg', 10);
// productManager.addProduct('3', '', 'Producto sin título', 'Precio Incorrecto', 'thumbnail.jpg', 'Stock Incorrecto');
// console.log(productManager.getProducts());

// console.log(productManager.getProductById(3));
// console.log(productManager.getProductById(1));
