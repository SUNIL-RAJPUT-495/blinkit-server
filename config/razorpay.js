import Razorpay from "razorpay";
 export const razorpay = new Razorpay({
    key_id: process.env.RAZARPAY_API_KEY,
    key_secret:process.env.RAZARPAY_API_KEY_SECRET
})