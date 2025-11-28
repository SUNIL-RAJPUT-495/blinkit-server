import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    // FIX: Corrected typo 'uderId' to 'userId'
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
    // IMPROVEMENT: Replaced single productId with an array of items for a full order
    items: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        // Store product details at time of order for history (like name/price)
        product_snapshot: {
            type: Object, 
            default: {}
        }
    }],
    // Removed the conflicting 'product_detail' field and replaced with 'items' array
    payment_Id: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: "Pending", // Set a meaningful default status
        enum: ['Pending', 'Paid', 'Failed'] // Recommended to restrict values
    },
    // FIX: Corrected typo 'delivary_address'
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        // RECOMMENDATION: Use capitalized model name 'Address'
        ref: "Address" 
    },
    // FIX: Corrected typo 'delivary_status'
    delivery_status: {
        type: String,
        default: "Processing", // Set a meaningful default status
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] // Recommended to restrict values
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});

// FIX: Changed 'mongoose.Model' to 'mongoose.model' (lowercase 'm')
// RECOMMENDATION: Capitalized model name 'Order'
const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;