import { razorpay } from "../config/razorpay.js";
import Order from "../model/order.model.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
  try {
    const { totalPrice, totalItems, cartItems, deliveryAddress } = req.body

    const razorpayOrder = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      payment_capture: 1,
    })

    const order = await Order.create({
      userId: req.userId,
      cartItems: cartItems,
      totalItems,
      totalAmount: totalPrice,
      deliveryAddress,
      payment: {
        razorpayOrderId: razorpayOrder.id,
        status: "pending",
      },
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const verifyPayment = async (req, res) => {

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZARPAY_API_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");


    if (generated_signature === razorpay_signature) {
      const order = await Order.findOneAndUpdate(
        { "payment.razorpayOrderId": razorpay_order_id },
        {
          $set: {
            "payment.razorpayPaymentId": razorpay_payment_id,
            "payment.status": "paid",
          },
        },
        { new: true }
      ); return res.status(200).json({
        success: true,
        order
      });
    }
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

// Get all orders (for Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get My Orders (for Customer)
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
