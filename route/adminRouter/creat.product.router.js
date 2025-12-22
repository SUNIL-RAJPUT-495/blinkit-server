import express from "express";
import {createProduct,editProduct,deleteProduct,getAllProducts} from "../../controllers/creatProduct.controller.js"

const product = express.Router();

product.post("/add-product",createProduct)
product.put("/edit-Product/:id",editProduct)
product.delete("/delet-product/:id",deleteProduct)
product.get("/getAllProducts",getAllProducts)


export default product;
