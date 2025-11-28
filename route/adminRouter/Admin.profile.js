import { upload } from "../../middleware/upload.js";
import { createAdmin, getAdmin, updateAdmin } from "../../controllers/AdminProfil.controller.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/admin", upload.single("profilePic"), createAdmin);
adminRouter.get("/admin/:id", getAdmin);
adminRouter.put("/admin/:id", upload.single("profilePic"), updateAdmin);

export default adminRouter;
