import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        Type :String,
    },
        image :{
        Type:Array,
        default:[]
        },
        category:[{
            Type:mongoose.Schema.ObjectId,
            ref:'category'
        }],
        subCategory : [{
            Type : mongoose.Schema.ObjectId,
            ref : "subCatory"
        }],
        unit:{
            type : String,
            default:""
        },
        stock:{
            type:Number,
            default:null
        },
        price:{
            type:Number,
            default:null
        },
        discount:{
            type:Number,
            default:""
        },
        description :{
            type:String,
            default:""
        },
        more_details:{
            type:Object,
            default:{}
        },
        publish:{
            type:Boolean,
            default:true
        }
    
},{
    timesstamps:true
})
const ProdeuctModel  =mongoose.model("Product",productSchema)
export default ProdeuctModel