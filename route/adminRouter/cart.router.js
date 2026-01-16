import express from "express"
import { Cart } from "../../controllers/cart.controller.js";

const cart = express.Router();

cart.post("/add-cart",Cart)

export default cart ;