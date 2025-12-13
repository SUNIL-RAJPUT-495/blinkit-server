import SubCategory from "../model/subcatogory.model.js";

/* ================= ADD SUB CATEGORY ================= */
export const addSubCategory = async (req, res) => {
  try {
    const { name, categoryId, image } = req.body;

    if (!name || !categoryId || !image) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const newSubCategory = await SubCategory.create({
      name,
      categoryId,
      image,
    });

    const populated = await newSubCategory.populate("categoryId", "name image");

    return res.json({
      success: true,
      message: "Sub Category Added Successfully",
      data: populated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= GET ALL SUB CATEGORY ================= */
export const getAllSubCategory = async (req, res) => {
  try {
    const data = await SubCategory.find().populate("categoryId", "name image");
    res.json({ success: true, data });
  } catch (error) {
    console.error("Get SubCategory Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/* ================= DELETE SUB CATEGORY ================= */
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await SubCategory.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Sub Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* ================= UPDATE SUB CATEGORY ================= */
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId, image } = req.body;

    const updated = await SubCategory.findByIdAndUpdate(
      id,
      { name, categoryId, image },
      { new: true }
    ).populate("categoryId", "name image");

    return res.json({
      success: true,
      message: "Sub Category Updated Successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
