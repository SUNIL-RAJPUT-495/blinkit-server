import express from "express";
import { upload } from "../middleware/upload.js";
import { createCategory, getAllCategory, deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategory);
router.delete("/:id", deleteCategory);

export default router;
