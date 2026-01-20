import express from "express"
import { createOrder } from "../../controllers/order.controller.js";
import { verifyPayment } from "../../controllers/order.controller.js";

const order = express.Router();

order.post("/orderCreat",createOrder);
order.put("/verifyPayment",verifyPayment)

export default order ;