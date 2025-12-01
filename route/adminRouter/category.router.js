import express from "express";
import { createCategory, getAllCategory, deleteCategory } from "../../controllers/category.controller.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/", getAllCategory);
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;
