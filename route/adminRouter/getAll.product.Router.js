import express from "express";
import { getAllProducts, deleteProduct, createProduct } from "../../controllers/all.product.controller.js"; 

const all_product = express.Router();

all_product.get("/", getAllProducts); 
all_product.delete("/:id", deleteProduct);

export default all_product;