import { Router } from "express";
import ProductManager from "../dao/product.manager.js";
const Product = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.get();
    const response = products.map(
      ({
        _id,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
      }) => ({
        id: _id,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
      })
    );
    res.json({ response });
  } catch (error) {}
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.getById(pid);
    res.json({ product });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };
    await Product.save(product);
    res.json({ message: `product has been saved`, product });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };
    await Product.update(pid, product);
    res.json({ message: `product has been updated`, product });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await Product.deleteById(pid);
    res.json({ message: `product with Id ${pid} has been deleted` });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/populate/", async (req, res) => {
  try {
    await Product.populate();
    res.json({ message: "products have been uploaded" });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/despopulate", async (req, res) => {
  try {
    await Product.despopulate();
    res.json({ message: `products have been eliminated` });
  } catch (error) {
    res.json({ error });
  }
});

export default router;
