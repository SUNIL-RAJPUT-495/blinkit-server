import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        // FIXED: Changed 'Type' to 'type'
        type: String, 
    },
    image: {
        // FIXED: Changed 'Type' to 'type'
        type: String,
        default: []
    },
    category: [{
        // FIXED: Changed 'Type' to 'type'
        type: mongoose.Schema.ObjectId, 
        // SUGGESTION: Changed to 'Category' assuming model name is capitalized
        ref: 'Category', 
        required: true,
    }],
    subCategory: [{
        // FIXED: Changed 'Type' to 'type'
        type: mongoose.Schema.ObjectId,
        // SUGGESTION: Changed to 'SubCategory' and fixed typo 'subCatory'
        ref: "SubCategory" 
    }],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: null
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: 0 // Changed default from "" to 0 for a Number type
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }

}, {
    // FIXED: Changed 'timesstamps' to 'timestamps'
    timestamps: true 
});

// Typo Fix: Changed 'ProdeuctModel' to 'ProductModel'
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;