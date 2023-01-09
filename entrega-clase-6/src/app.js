import express from "express";
import ProductManager from "./manager/productManager.js";

//instancia de express
const app = express();

//constante del path
const path = "./src/db/vehicles.json";

//middleware para codificacion de datos mas complejos
app.use(express.urlencoded({ extended: true }));

//instancia de la clase Product Manager
const productManager = new ProductManager(path);

//trae todos los productos, pero acepta desde y hasta para acortar la busqueda
app.get("/products", (req, res) => {
  const { from = 1, limit = Infinity} = req.query;
    productManager  
    .getProducts()  
    .then((data) => res.send(data.splice(from - 1, limit)))
    .catch((error) => console.log(error));
});

//trae el producto indicado en el id
app.get('/products/:id', (req, res) => {
    const {id} = req.params;
    productManager
    .getProductById(Number(id))
    .then((data) => res.send(data))
    .catch((error) => console.log(error));
})

//numero de puerto elegido
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`server running on port ${server.address().port}`);
});
