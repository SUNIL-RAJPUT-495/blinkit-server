import mongoose, { Types } from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line:{
        Type :String,
        default:""
    },
    city :{
         type: String,
         default:""
        },
    state :{
         type: String,
         default:""
        },
    pincode:{
        type:Dtring
    },
    country:{
         type:String
},
    mobile:{
        type:String,
        default:""
    },
    status:{
        type:Boolean,
        default:true
    }


},{
    timestamps:true
})
const AdressModel = mongoose.model("address",addressSchema)
export default AdressModel