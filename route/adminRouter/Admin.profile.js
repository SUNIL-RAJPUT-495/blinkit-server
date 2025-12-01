
import { createAdmin, getAdmin, updateAdmin } from "../../controllers/AdminProfil.controller.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/:id", getAdmin);

export default adminRouter;
