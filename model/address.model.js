import mongoose, { Types } from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line: {
        // FIXED: Changed 'Type' to lowercase 'type'
        type: String, 
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        // FIXED: Corrected typo from 'Dtring' to 'String'
        type: String 
    },
    country: {
        type: String
    },
    mobile: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// BEST PRACTICE: Used a capitalized model name 'Address'
const AddressModel = mongoose.model("Address", addressSchema); 
export default AddressModel;