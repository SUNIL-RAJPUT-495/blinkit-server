import express from "express";
import {
  addSubCategory,
  getAllSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "../../controllers/subCategory.controller.js";

const SubCategoryRouter = express.Router();

/* ================= SUB CATEGORY ROUTES ================= */

// Add Sub Category
SubCategoryRouter.post("/add-subcategory", addSubCategory);

// Get All Sub Categories
SubCategoryRouter.get("/get-subcategory", getAllSubCategory);

// Update Sub Category
SubCategoryRouter.put("/update-subcategory/:id", updateSubCategory);

// Delete Sub Category
SubCategoryRouter.delete("/delete-subcategory/:id", deleteSubCategory);

export default SubCategoryRouter;
