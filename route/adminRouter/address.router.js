import { Router } from "express";
import { saveAddress, showAddress } from "../../controllers/address.controller.js";
import auth from "../../middleware/auth.js";

const address = Router()

address.post("/save-address", auth, saveAddress);
address.get("/show-address", auth, showAddress);
export default address;