export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      image,
    });

    await newProduct.save();

    res.json({ success: true, message: "Product Created", data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);

    res.json({ success: true, message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
