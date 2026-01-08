import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"], 
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Provide password"], 
        minlength: 8, 
        select: false, 
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: null
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
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: null 
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {
    timestamps: true
});


const UserModel = mongoose.model("User", userSchema)
export default UserModel;