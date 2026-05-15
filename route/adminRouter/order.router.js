import express from "express";
import { createOrder, verifyPayment, getAllOrders, getMyOrders } from "../../controllers/order.controller.js";
import auth from "../../middleware/auth.js";

const order = express.Router();

order.post("/orderCreat", auth, createOrder);
order.put("/verifyPayment", auth, verifyPayment);
order.get("/getAllOrders", auth, getAllOrders);
order.get("/getMyOrders", auth, getMyOrders);

export default order ;