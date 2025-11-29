import { upload } from "../../middleware/upload.js";
import { createAdmin, getAdmin, updateAdmin } from "../../controllers/AdminProfil.controller.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/", upload.single("profilePic"), createAdmin);
adminRouter.get("/:id", getAdmin);
adminRouter.put("/:id", upload.single("profilePic"), updateAdmin);

export default adminRouter;
