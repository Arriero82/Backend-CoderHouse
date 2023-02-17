import { Router } from "express";
import CartManager from "../dao/cart.manager.js";
const Cart = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.get();
    const response = carts.map(({ _id, products }) => ({
      id: _id,
      products,
    }));
    res.json({ response });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.getById(cid);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = {};
    const cart = await Cart.create(product);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    console.log();  
    await Cart.addProduct(cid, pid);
    const cart = await Cart.getById(cid);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
}); 

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.deleteById(cid);
    res.json({ cart });
  } catch (error) {
    res.json({ error });
  }
});

export default router;
