import SubCategory from "../models/SubCategory.js";

// Add sub category
export const addSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: "Name and Category are required" });
    }

    const newSubCategory = new SubCategory({
      name,
      category,
      image: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null,
    });

    await newSubCategory.save();

    res.json({
      success: true,
      message: "Sub Category Added Successfully",
      data: newSubCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error", details: error });
  }
};

// Get all sub categories
export const getAllSubCategory = async (req, res) => {
  try {
    const data = await SubCategory.find().select("-image.data");
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// Get Image by ID
export const getSubCategoryImage = async (req, res) => {
  try {
    const sub = await SubCategory.findById(req.params.id);

    if (!sub || !sub.image || !sub.image.data) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-Type", sub.image.contentType);
    res.send(sub.image.data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Delete sub category
export const deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// Update sub category
export const updateSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const updateData = { name, category };

    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, updated });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
