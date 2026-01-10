
import mongoose from "mongoose";

const subcategoriesSchema = new mongoose.Schema(
  {
    name: {
       type: String,
        required: true
       },
    
    image: { 
      type: String, 
      default: ""
     },
  
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subcategoriesSchema);
export default SubCategory;
