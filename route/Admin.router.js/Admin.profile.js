import { ProfileAdminController } from "../../controllers/AdminProfil.controller.js";
import { upload } from "../../middleware/uplod.js";
import { createAdmin,getAdmin,updateAdmin } from "../../controllers/AdminProfil.controller.js";
import {Router} from "express"

const Adminprofile = Router()
Adminprofile.post("/Profile",ProfileAdminController)
Adminprofile.put()
export default Adminprofile;
