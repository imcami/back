import mongoose from "mongoose";

export const productsCollection = "productos";

export const productsSchema = new mongoose.Schema({
    timestamp: { type: String, rqquired: true},
    title: { type: String, rqquired: true},
    description: { type: String, rqquired: true},
    code: { type: String, rqquired: true},
    photo: { type: String, rqquired: true},
    value: { type: String, rqquired: true},
    stock: { type: String, rqquired: true}
})

export const ProductsModel = mongoose.model(
    productsCollection,
    productsSchema
);
