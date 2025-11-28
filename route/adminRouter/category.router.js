import express from "express";
import { upload } from "../middleware/upload.js";
import { createCategory, getAllCategory, deleteCategory } from "../../controllers/category.controller.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", upload.single("image"), createCategory);
categoryRoutes.get("/", getAllCategory);
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;
