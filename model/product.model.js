// product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: [String],
    default: []
  },
  category: [{
    type: mongoose.Schema.ObjectId,
    ref: "Category", required: true
  }],
  subCategory:
    [{
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory"
    }],
  unit:
  {
    type: String,
    default: ""
  },
  stock:
  {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
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
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
