import express from "express";
import { createCategory, getAllCategory, deleteCategory } from "../../controllers/category.controller.js";
import auth from "../../middleware/auth.js"

const categoryRoutes = express.Router();

categoryRoutes.post("/add-category",auth, createCategory);
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;
