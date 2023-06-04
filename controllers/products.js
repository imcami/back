import { ProductsModel } from "../models/products.js";
import { validationResult } from "express-validator";
import { formatTimeStamp } from "../utils/format.js";

export const getAllProducts = async (req, res) => {
  try {
    let products = await ProductsModel.find();
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    //Tuve que agregar esta validación del id ya que si se envia en la consulta un id menor a 24 caracteres rompe
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    }

    let product = await ProductsModel.findById(id);

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    }

    return res.status(200).json({
      data: product,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, code, photo, value, stock } = req.body;

    let timestamp = formatTimeStamp();

    const newProduct = await ProductsModel.create({
      timestamp,
      title,
      description,
      code,
      photo,
      value,
      stock,
    });
    return res.status(201).json({
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const id = req.params.id;
    const { title, description, code, photo, value, stock } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    }

    let product = await ProductsModel.findById(id);

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      const productUpdated = await ProductsModel.findByIdAndUpdate(
        id,
        { title, description, code, photo, value, stock },
        { new: true }
      );
      return res.status(200).json({
        mensaje: "producto actualizado con exito",
        data: productUpdated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {

    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    }

    let product = await ProductsModel.findById(id);

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado!",
      });
    } else {
      await ProductsModel.findByIdAndDelete(id);
      return res.status(200).json({
        mensaje: "producto eliminado con exito",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};
