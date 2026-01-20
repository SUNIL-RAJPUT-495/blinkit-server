import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },
    last_login_date: {
        type: Date,
        default: null
    },
    otp:{
        type:String,
        default: "123456"

    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"], 
        default: "Active"
    },
    address_details: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
    shopping_cart: [{ 
        type: mongoose.Schema.ObjectId,
        ref: 'CardProduct' 
    }],

    orderHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    }],
    
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {
    timestamps: true
});


const customerUserModel = mongoose.model("customerUser", userSchema)
export default customerUserModel;