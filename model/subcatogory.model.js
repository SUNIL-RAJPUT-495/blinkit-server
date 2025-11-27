import mongoose from "mongoose";

const subcategoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    image:{
      data: Buffer,
    contentType: String,
    },
    category:[
{
    type:mongoose.Schema.ObjectId,
    ref:"category"
}
    ]
},{
    timestamps:true
})
const SubCatogeryModel = mongoose.model("subCatory",subcategoriesSchema)
export default SubCatogeryModel;