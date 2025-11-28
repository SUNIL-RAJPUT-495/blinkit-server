import express from "express";
import multer from "multer";
import {
  addSubCategory,
  getAllSubCategory,
  getSubCategoryImage,
  deleteSubCategory,
  updateSubCategory
} from "../../controllers/subCategory.controller.js";

const Sub_Category = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
Sub_Category.post("/add", upload.single("image"), addSubCategory);
Sub_Category.get("/", getAllSubCategory);
Sub_Category.get("/image/:id", getSubCategoryImage);
Sub_Category.delete("/:id", deleteSubCategory);
Sub_Category.put("/:id", upload.single("image"), updateSubCategory);

export default Sub_Category;
