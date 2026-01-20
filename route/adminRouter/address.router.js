import { Router } from "express";
import { saveAddress } from "../../controllers/address.controller.js";

const address = Router()

address.post("/save-address",saveAddress)
export default address;