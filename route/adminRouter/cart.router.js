import express from "express"
import { createOrder } from "../../controllers/cart.controller.js";

const cart = express.Router();

cart.post("/add-cart",createOrder)

export default cart ;