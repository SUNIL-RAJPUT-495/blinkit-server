import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    uderId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    orderId:{
        type:String,
        required:[true,"Provide orderId"],
        unique : true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"Product"
    },
    product_detail:{
        type:String,
        image:Array,

    }, 
    payment_Id:{
        type:String,
        default:""
    },
    payment_status:{
        type:String,
        default:""
    },
    delivary_address:{
        type:mongoose.Schema.ObjectId,
        ref:"address"
    },
    delivary_status:{
        type:String
    },
    subTotalAmt:{
        type:Number,
        default:0
    },
    totalAmt:{
        type:Number,
        default:0
    },
    invoice_receipt:{
        type:String,
        default:""
    },
},{
    timestamps:true
})
const orderModel = mongoose.Model("order",orderSchema)
export default orderModel