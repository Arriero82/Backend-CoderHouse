import Cart from "./models/carts.models.js";
import productManager from "./product.manager.js"

const Product = new productManager()

class CartManager {
  async get() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(cid) {
    try {
      const cart = await Cart.findById(cid);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async create(product) {
    try {
      const cart = await Cart.create(product);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async addProduct(cid, pid) {
    try {
      const product = await Product.getById(pid);
      if (!product) return `it doesn't exist a product with id ${pid}`;
      const cart = await Cart.findById(cid);
      if (!cart) return `       it doesn't exist a cart with id ${cid}`;
      console.log(cart);
      const productInCart = cart.products.find((elem) => elem._id === pid);
      let newProductsInCart = "";
      if (!productInCart) {
        const productToCart = { _id: pid, quantity: 1 };
        newProductsInCart = cart.products.push(productToCart);
      } else {
        const index = cart.products.map((elem) => elem._id).indexOf(pid);
        cart.products[index].quantity += 1;
        newProductsInCart = cart.products;
      }
      await Cart.updateOne(
        { _id: cid },
        { $set: { products: newProductsInCart } }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(cid) {
    try {
      await Cart.findByIdAndDelete(cid);
      return `cart with id ${cid} has been deleted`;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartManager;
