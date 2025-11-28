import mongoose from "mongoose";

const cardProductSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        // RECOMMENDATION: Use capital 'Product' to match model naming convention
        ref: 'Product' 
    },
    quantity: {
        type: Number,
        // FIXED: Changed default from "" to a number (0 or 1)
        default: 1 
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

// FIXED: Changed 'mongoose.Model' to 'mongoose.model' (lowercase 'm')
// RECOMMENDATION: Capitalize the model variable name: 'CardProductModel'
const CardProductModel = mongoose.model("CardProduct", cardProductSchema); 
export default CardProductModel;