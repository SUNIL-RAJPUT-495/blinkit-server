import mongoose from "mongoose";

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
            default:""
        },
    },
    { timestamps: true }
);

    
const AdminUser = mongoose.model("AdminUser", adminSchema);
export default AdminUser;