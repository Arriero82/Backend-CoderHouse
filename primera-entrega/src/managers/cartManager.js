const fs = require("fs/promises");
const { v4: uuid } = require("uuid");
const ProductManager = require("./productManager");

class CartManager extends ProductManager {
  constructor(path) {
    super(path);
  }
  async addCart() {
    const carts = await this.getProducts();
    const id = uuid();
    const cart = { id, products: [] };
    carts.push(cart);
    await fs.writeFile(this.path, JSON.stringify(carts, null));
  }
  async addProduct(cid, pid) {
    const carts = await this.getProducts();
    const indexCart = carts.map((cart) => cart.id).indexOf(cid);
    if (indexCart === -1) {
      return { error: `no cart found with id ${cid}` };
    } else {
      const cart = carts[indexCart];
      const indexProd = cart.products.map((product) => product.id).indexOf(pid);
      if (indexProd === -1) {
        const product = { id: pid, quantity: 1 };
        cart.products.push(product);
        carts.splice(indexCart, 1, { ...cart, id: cid });
        await fs.writeFile(this.path, JSON.stringify(carts, null));
        return `product with id ${pid} has been added to cart id ${cid}`;
      } else {
        const quantity = cart.products[indexProd].quantity + 1;
        const product = { id: pid, quantity};
        cart.products.splice(indexProd, 1, {...product})
        carts.splice(indexCart, 1, { ...cart, id: cid });
        await fs.writeFile(this.path, JSON.stringify(carts, null)); 
        return `product with id ${pid} has been added to cart for a total of ${quantity} units`;
      }
    }
  }
}

module.exports = CartManager;
