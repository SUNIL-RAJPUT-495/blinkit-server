import ProdeuctModel from "../model/product.model.js";

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

    const newProduct = new ProdeuctModel({
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
