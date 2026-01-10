import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String,
        required: [true, "Provide orderId"],
        unique: true
    },
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
        product_snapshot: {
            type: Object, 
            default: {}
        }
    }],
    payment_Id: {
        type: String,
        default: ""
    },
    payment_status: {
        type: String,
        default: "Pending", 
        enum: ['Pending', 'Paid', 'Failed'] 
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: "Address" 
    },
    delivery_status: {
        type: String,
        default: "Processing", 
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'] 
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

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;