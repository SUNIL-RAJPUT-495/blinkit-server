import mongoose from "mongoose";

const cardProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product' 
    },
    quantity: {
        type: Number,
        default: 1 
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

const CardProductModel = mongoose.model("CardProduct", cardProductSchema); 
export default CardProductModel;