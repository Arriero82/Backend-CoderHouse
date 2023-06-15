import { v4 as uuidv4 } from "uuid";
import Cart from "./models/carts.models.js";
import ProductManager from "./products.mongo.js";
import TicketManager from "./tickets.mongo.js";

const Product = new ProductManager();
const Ticket = new TicketManager();

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
      const cart = await Cart.findOne({ _id: cid });
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
      if (!cart) return `it doesn't exist a cart with id ${cid}`;

      const index = cart.products
        .map((elem) => elem.product._id.toString())
        .indexOf(pid);

      if (index === -1) {
        cart.products.push({ product: pid });
      } else {
        cart.products[index].quantity += 1;
      }

      const response = await Cart.updateOne({ _id: cid }, cart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async insertProducts(cid, productsArray) {
    try {
      const cart = await Cart.findOne({ _id: cid });
      cart.products = productsArray;
      const response = await Cart.updateOne({ _id: cid }, cart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuantity(cid, pid, quantity) {
    try {
      let number = Number(quantity);
      const cart = await Cart.findById(cid);
      const index = cart.products
        .map((elem) => elem.product._id.toString())
        .indexOf(pid);
      cart.products[index].quantity = number;
      const response = await Cart.updateOne({ _id: cid }, cart);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async purchase(cid, userEmail) {
    try {
      const cart = await Cart.findById(cid);
      if (cart.products.length === 0) {
        return "cart has no products, add products";
      }

      let ammount = 0;

      for (let i = 0; i < cart.products.length; i++) {
        let id = cart.products[i].product._id.toString();

        let quantity = cart.products[i].quantity;
        const dbProduct = await Product.getById(id);

        if (quantity <= dbProduct.stock) {
          dbProduct.stock = dbProduct.stock - quantity;
          await Product.update(id, dbProduct);
          ammount += quantity * dbProduct.price;
          console.log(cart.products);
          cart.products[i] = {}
          cart.products[i].quantity =  0;
          await Cart.updateOne({ _id: cid }, { $set: { products: cart.products } });
        }
      }

      const code = uuidv4();
      const purchase_datetime = new Date().toISOString();
      const purchaser = userEmail;

      const ticketData = {
        code,
        purchase_datetime,
        ammount,
        purchaser,
      };

      const ticket = await Ticket.create(ticketData)
      return ticket 

    } catch (error) {}
  }

  async deleteProductById(cid, pid) {
    try {
      const product = await Product.getById(pid);
      if (!product) return `it doesn't exist a product with id ${pid}`;
      const cart = await Cart.findById(cid);
      if (!cart) return `it doesn't exist a cart with id ${cid}`;

      const index = cart.products
        .map((elem) => elem.product._id.toString())
        .indexOf(pid);

      cart.products.splice(index, 1);

      await Cart.updateOne({ _id: cid }, { $set: { products: cart.products } });
      const updatedCart = await Cart.findById(cid);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(cid) { 
    try {
      if (cid.toString().length !== 24)
        return `product id must have 24 characters`;
      const cart = await Cart.findOne({ _id: cid });
      if (!cart) return `it doesn't exist a cart with id ${cid}`;

      cart.products = [];
      await Cart.updateOne({ _id: cid }, cart);
      const updatedCart = await Cart.findById(cid);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartManager;
