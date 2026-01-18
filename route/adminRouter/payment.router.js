import express from "express";
import { createPaymentOrder,verifyPayment } from "../../controllers/payament.controller.js";

const payment = express.Router();

payment.post("/create-order", createPaymentOrder);
payment.post("/verify", verifyPayment);

export default payment;
