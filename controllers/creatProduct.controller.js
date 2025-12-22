import ProductModel from ".././model/product.model.js"
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
      subCategory,
      image // Array of URLs
    } = req.body;

    const newProduct = new ProductModel({
      name,
      description,
      price: Number(price),
      discount: Number(discount),
      unit,
      stock: Number(stock),
      category,
      subCategory,
      image: Array.isArray(image) ? image : [image], // always array
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};





// ------------------ DELETE PRODUCT ------------------
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const deleted = await ProductModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------ EDIT PRODUCT ------------------
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      discount,
      unit,
      stock,
      category,
      subCategory,
      image,
    } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price: price !== undefined ? Number(price) : undefined,
        discount: discount !== undefined ? Number(discount) : undefined,
        unit,
        stock: stock !== undefined ? Number(stock) : undefined,
        category,
        subCategory,
        image: Array.isArray(image) ? image : image ? [image] : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ------------------ GET ALL PRODUCTS ------------------




export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate("category", "name")       
      .populate("subCategory", "name")   
      .sort({ createdAt: -1 });           
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

