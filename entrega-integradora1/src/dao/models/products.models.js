import mongoose from "mongoose";

const productsCollection = 'products';

const productSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number,
    status: {
        type: Boolean,
        default: true
    },
    stock: Number,
    category: String,
    thumbnails: [String]
})

const Products = mongoose.model(productsCollection, productSchema)

export default Products