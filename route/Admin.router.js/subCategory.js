import express from "express";
import multer from "multer";
import {
  addSubCategory,
  getAllSubCategory,
  getSubCategoryImage,
  deleteSubCategory,
  updateSubCategory
} from "../controllers/subCategoryController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), addSubCategory);
router.get("/", getAllSubCategory);
router.get("/image/:id", getSubCategoryImage);
router.delete("/:id", deleteSubCategory);
router.put("/:id", upload.single("image"), updateSubCategory);

export default router;
