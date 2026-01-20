import { Router } from "express";
import upload from "../../middleware/multer.js";
import { uploadSingleImage, uploadProductImages } from "../../controllers/uploadImage.controller.js";

const uploadRouter = Router();

uploadRouter.post(
  "/upload",
  upload.single("image"),
  uploadSingleImage
);


uploadRouter.post(
  "/upload-product",
  upload.array("productImages", 5),
  uploadProductImages
);


export default uploadRouter;



