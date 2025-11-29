import express from "express";
import { upload } from "../../middleware/upload.js";
// FIXED: Added createProduct to the import list
import { getAllProducts, deleteProduct, createProduct } from "../../controllers/all.product.controller.js"; 

const all_product = express.Router();

// This line uses the createProduct function, so it must be imported.
all_product.post("/", upload.single("image"), createProduct); 
all_product.get("/", getAllProducts); 
all_product.delete("/:id", deleteProduct);

export default all_product;