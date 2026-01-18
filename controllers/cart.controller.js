import Order from "../model/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.userId,
      items: req.body.items,
      totalItems: req.body.totalItems,
      totalAmount: req.body.totalAmount,
      deliveryAddress: req.body.deliveryAddress,
      payment: {
        razorpayOrderId: req.body.razorpayOrderId,
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
