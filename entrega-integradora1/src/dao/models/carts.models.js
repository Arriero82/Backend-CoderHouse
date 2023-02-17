import mongoose from "mongoose";

const cartsCollection = 'carts';

const productsInCartSchema = mongoose.Schema({
    _id: String,
    quantity: Number  
})

const cartSchema = mongoose.Schema({
    products: [productsInCartSchema]
})

const Carts = mongoose.model(cartsCollection, cartSchema)

export default Carts