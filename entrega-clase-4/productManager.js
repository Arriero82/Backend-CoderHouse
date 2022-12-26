const { promises: fs } = require("fs");
const { title } = require("process");

class ProductManager {
  constructor() {
    this.path = "./db/products.json";
  }

  async exists() {
    try {
      await fs.access(this.path);
      return true;
    } catch {
      return false;
    }
  }

  async getProducts() {
    if (await this.exists()) {
      const data = await fs.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }
  }
  async addProducts(product) {
    let { title, code } = product;
    let products = await this.getProducts();
    let anyMissing = Object.values(product);
    let anyMissingKeyValues = Object.entries(product);

    if (products.length === 0) {
      product.id = 1;
    } else {
      product.id = products[products.length - 1].id + 1;
    }

    /*     let codeArray = [];
    products.forEach((el) => {
      codeArray.push(el.code);
    }); */

    if (anyMissing.includes("")) {
      console.log(`missing information, please see: ${anyMissingKeyValues}`);
    } else {
      if (
        products.some((product) => product.code === code) ||
        products.some((product) => product.title === title)
      ) {
        console.log(
          `product code: ${product.code} or title: ${product.title} already in use`
        );
      } else {
        products.push(product);
        await fs.writeFile(this.path, JSON.stringify(products, null));
      }
    }
  }

  async getProductById(id) {
    let products = await this.getProducts();
    let product = products.filter((prod) => prod.id === id);
    if (product.length == 0) {
      return `no product found with id ${id}`;
    } else {
      return product[0];
    }
  }
  async updateProduct(id, product) {
    let products = await this.getProducts();
    const indexDelete = products.map((product) => product.id).indexOf(id);
    if (indexDelete != -1) {
      products.splice(indexDelete, 1, { ...product, id });
      await fs.writeFile(this.path, JSON.stringify(products, null));
      return `product with id ${id} has been updated`;
    } else {
      return `no product found with id ${id}`;
    }
  }
  async deleteProduct(id) {
    let products = await this.getProducts();
    const indexDelete = products.map((product) => product.id).indexOf(id);
    if (indexDelete != -1) {
      products.splice(indexDelete, 1);
      await fs.writeFile(this.path, JSON.stringify(products, null));
      return `product with id ${id} has been deleted`;
    } else {
      return `no product found with id ${id}`;
    }
  }
}

module.exports = ProductManager;
