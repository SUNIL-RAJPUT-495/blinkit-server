import mongoose, { Types } from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: 'customerUser',
    },
    address_line: {
        type: String, 
        default: ""
    },
    
    name:{
        type:String,
        default:""
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

const AddressModel = mongoose.model("Address", addressSchema); 
export default AddressModel;