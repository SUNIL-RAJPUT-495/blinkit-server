import mongoose from "mongoose";
const cardProductSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:'product'
    },
    quantity:{
        type:Number,
        default:""
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
})
const cardProductModel = mongoose.Model("cardProduct",cardProductSchema)
export default cardProductModel