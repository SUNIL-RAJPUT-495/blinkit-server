import mongoose from "mongoose";
import bcrypt from 'bcryptjs'; // You'll need to install this: npm install bcryptjs

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        // CRITICAL: Added password field
        password: {
            type: String,
            required: true,
            minlength: 6, 
        },
        mobile: {
            type: String,
        },
        profilePic: {
            type: String,
        },
    },
    { timestamps: true }
);

// SECURITY HOOK: Hash the password before saving
adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const AdminUser = mongoose.model("AdminUser", adminSchema);
export default AdminUser;