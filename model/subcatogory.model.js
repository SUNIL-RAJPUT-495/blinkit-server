import mongoose from "mongoose";

const subcategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    // FIXED: Corrected syntax for nested object types
    image: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        },
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            // FIXED: Used PascalCase 'Category' for reference string
            ref: "Category" 
        }
    ]
}, {
    timestamps: true
});

// FIXED: Corrected model variable and model name string typos ('subCatory' -> 'SubCategory')
const SubCategoryModel = mongoose.model("SubCategory", subcategoriesSchema);
export default SubCategoryModel;