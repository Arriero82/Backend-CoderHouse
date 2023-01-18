const fs = require("fs/promises");
const { v4: uuid } = require("uuid");

class ProductManager {
  constructor(path) {
    this.path = path;
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

    if (anyMissing.includes(undefined)) {
      return {error: `missing information, please see: ${anyMissingKeyValues}`};
    } else {
      if (
        products.some((product) => product.code === code) ||
        products.some((product) => product.title === title)
      ) {
        return {error: `product code: ${product.code} or title: ${product.title} already in use`};
      } else {
        product.id = uuid();
        products.push(product);
        await fs.writeFile(this.path, JSON.stringify(products, null));
        return {success: `product has been added`}
      }
    }
  }

  async getProductById(id) {
    let products = await this.getProducts();
    let product = await products.find((prod) => prod.id === id);
    if (product === undefined) {
      return { error: `no product found with id ${id}` };
    }
    return product;
  }
  async updateProduct(id, product) {
    let products = await this.getProducts();
    const indexDelete = products.map((product) => product.id).indexOf(id);
    if (indexDelete === -1) {
      return {error: `no product found with id ${id}`};
    } else {
      products.splice(indexDelete, 1, { ...product, id });
      await fs.writeFile(this.path, JSON.stringify(products, null));
      return `product with id ${id} has been updated`;
    }
  }
  async deleteProduct(id) {
    let products = await this.getProducts();
    const indexDelete = products.map((product) => product.id).indexOf(id);
    if (indexDelete === -1) {
      return {error: `no product found with id ${id}`};
    } else {
      products.splice(indexDelete, 1);
      await fs.writeFile(this.path, JSON.stringify(products, null));
      return `product with id ${id} has been deleted`;
    }
  }
}

module.exports = ProductManager;
