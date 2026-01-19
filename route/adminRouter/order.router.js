import express from "express"
import { createOrder } from "../../controllers/order.controller";
import { verifyPayment } from "../../controllers/payament.controller";

const order = express.Router();

order.post("/orderCreat",createOrder);
order.put("/verifyPayment",verifyPayment)

export default order ;