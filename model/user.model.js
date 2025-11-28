import mongoose from "mongoose";
import bcrypt from 'bcryptjs'; // Must be installed: npm install bcryptjs

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // FIXED: require -> required
        required: [true, "Provide name"], 
        trim: true,
    },
    email: {
        type: String,
        // FIXED: require -> required
        required: [true, "Provide email"],
        unique: true,
        trim: true,
        lowercase: true, // IMPROVEMENT: Ensures email consistency
    },
    password: {
        type: String,
        // FIXED: require -> required, 'passward' -> 'password'
        required: [true, "Provide password"], 
        minlength: 8, // IMPROVEMENT: Minimum length for security
        select: false, // IMPROVEMENT: Never return password hash by default
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        // FIXED: defult -> default
        default: null
    },
    refresh_token: {
        type: String,
        // FIXED: defult -> default
        default: ""
    },
    verify_email: {
        type: Boolean,
        // FIXED: defult -> default
        default: false
    },
    last_login_date: {
        type: Date,
        // FIXED: defult -> default
        default: null // Use null for Date default instead of empty string
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"], // Corrected typo 'Suspanded'
        // FIXED: defult -> default
        default: "Active"
    },
    address_details: {
        // IMPROVEMENT: Use an array if a user can have multiple addresses
        type: mongoose.Schema.ObjectId,
        ref: 'Address' // Corrected ref casing if using best practices
    },
    // IMPROVEMENT: Array of Cart Items or reference to a Cart document
    shopping_cart: [{ 
        type: mongoose.Schema.ObjectId,
        ref: 'CardProduct' 
    }],
    // IMPROVEMENT: Array of past Orders
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
        default: null // Use null for Date default
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {
    timestamps: true
});

// 🔒 SECURITY HOOK: Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model("User", userSchema)
export default UserModel;