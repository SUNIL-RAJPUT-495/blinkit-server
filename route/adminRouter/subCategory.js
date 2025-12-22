import express from "express";
import {
  addSubCategory,
  getAllSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "../../controllers/subCategory.controller.js";

const SubCategoryRouter = express.Router();


SubCategoryRouter.post("/add-subcategory", addSubCategory);

SubCategoryRouter.get("/get-subcategory", getAllSubCategory);

SubCategoryRouter.put("/update-subcategory/:id", updateSubCategory);

SubCategoryRouter.delete("/delete-subcategory/:id", deleteSubCategory);

export default SubCategoryRouter;
