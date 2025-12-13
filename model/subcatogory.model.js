
import mongoose from "mongoose";

const subcategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    
    // Image URL string
    image: { type: String, default: "" },

    // Correct field name for population
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
