import mongoose from "mongoose"
import { productCollection } from './products.js'

export const cartCollection = "carritos"

export const CartSchema = new mongoose.Schema({
    tiemestamp:{ type: String, required: true }, 
    productsID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: productCollection,
        default: []
    },
  ],
})

export const CartModel = mongoose.model(cartCollection, CartSchema)