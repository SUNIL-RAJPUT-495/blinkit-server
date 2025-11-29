import express from "express";
import { upload } from "../../middleware/upload.js";
import {createProduct} from "../../controllers/creatProduct.controller.js"

const Create_product = express.Router();

Create_product.post("/", upload.single("image"), createProduct);

export default Create_product;
