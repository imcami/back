import { CartModel } from '../models/cart';
import { ProductsModel } from '../models/products';
import { validationResult } from 'express-validator'
import { formatTimeStamp } from "../utils/format.js"


export const getProducts = async (req, res) => {
    try {
        const id = req.params .id;

        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(404).json({
                mensaje: "carrito no encontrado",
            })
        } 
        const cart = await CartModel.findById(id)
        if(!cart){
            return res.status(404).json({
                mensaje: "carrito no encontrado"
            })
        } else{
            return res.status(200).json({
                data: cart,
            })
        }

    } catch (error) {
        res.status(500).json({
            error:error.message,
            stack: error.stack,
        })
    }
}

export const createCart = async (req, res)=>{
    try {
        let timestamp = formatTimeStamp()
        let products = []

        const cart = await CartModel.create({
            timestamp,
            products,
        })
        return res.status( 201 ).json({
            mensaje:`carrito ${cart._id.toString()} creado `
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
        })
    }
}


export const addProducts = async (req, res) => {
    try {
        const errors =validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errores: errors.array() })
        }
        const id = req.params.id;
        const productId = req.body.id;
    
        if (!id.match(/^[0-9a-fA-F]{24}$/) || !productId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(404).json({
            mensaje: "Carrito no encontrado!",
          });
        }
    
        let cart = await CartsModel.findById(id);
    
        if (!cart) {
          return res.status(404).json({
            mensaje: "Carrito no encontrado!",
          });
        }
    
        let product = await ProductsModel.findById(productId);
    
        if (!product) {
          return res.status(404).json({
            mensaje: "Producto no encontrado!",
          });
        }
    
        let productsID = cart.productsID;
        productsID.push(product._id);
    
        const productAddedToCart = await CartsModel.findByIdAndUpdate(
          id,
          { productsID },
          { new: true }
        );
    
        return res.status(201).json({
          mensaje: "producto agregado al carrito con exito",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
        })
    }
}


export const deleteProductInCartById = async (req, res) => {
    try {
  
      const id = req.params.id;
      const productId = req.params.id_prod;
  
      if (!id.match(/^[0-9a-fA-F]{24}$/) || !productId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({
          mensaje: "Carrito no encontrado!",
        });
      }
  
      let cart = await CartModel.findById(id);
  
      if (!cart) {
        return res.status(404).json({
          mensaje: "Carrito no encontrado!",
        });
      }
      let productExists = cart.productsID.find((item) => item.id.toString('hex') === productId);
  
      if (!productExists) {
        return res.status(404).json({
          mensaje: "Producto no encontrado!",
        });
      } else {
        
        let productsID = cart.productsID; 
  
        const filteredProducts = productsID.filter((item) => item.id.toString('hex') !== productId);
        productsID = filteredProducts;
  
        const productAddedToCart = await CartModel.findByIdAndUpdate(
          id, 
          {productsID});
  
        return res.status(201).json({
          mensaje: "producto eliminado del carrito con exito",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
        stack: error.stack,
      });
    }
  };
  