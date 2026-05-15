import { Router } from "express";
import { saveAddress, showAddress, getAllAddresses } from "../../controllers/address.controller.js";
import auth from "../../middleware/auth.js";

const address = Router()

address.post("/save-address", auth, saveAddress);
address.get("/show-address", auth, showAddress);
address.get("/getAllAddresses", auth, getAllAddresses);
export default address;