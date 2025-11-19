import mongoose, { Types } from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        Type: String,
        default:""
    },
    image:{
        Type:String,
        default:""
    },
},{
        timestamps:true
    })

    const categoryModel = mongoose.model('category',categorySchema)
    export default categoryModel