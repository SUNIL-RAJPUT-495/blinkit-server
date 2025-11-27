import express from "express";
import { upload } from "../middleware/upload.js";
import { createProduct, getAllProducts, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts); // <---- NEW
router.delete("/:id", deleteProduct); // <---- DELETE

export default router;
