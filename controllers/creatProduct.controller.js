import Product from "../models/Product.model.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      unit,
      stock,
      category,
      subCategory
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      unit,
      stock,
      category,
      subCategory,
      image: req.file?.filename,
    });

    await newProduct.save();

    res.json({ success: true, message: "Product created", data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
