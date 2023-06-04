import Router from 'express';

const router = Router();
import {
    getProducts, 
    createCart, 
    addProducts, 
    dalateCartById, 
    delateCartProductById
} from '../controllers/cart.js'
import { body } from "express-validator"

router.get("/:id7products", getProducts)
router.post("/", createCart)
router.post("/:id/products", 
    body('id').not().isEmpty(), 
    addProducts
    );
router.delate("/:id",dalateCartById);
router.delate("/:id/products/:id_prod", delateCartProductById)