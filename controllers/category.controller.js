import CategoryModel from "../model/category.model.js";
import Category from "../model/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if(!name||!image){
      return res.json({
        message: "Enter required fields",
        error:true,
        success:false
      })
    }

    const addCategory =new CategoryModel({
      name,
      image
    })
    const saveCategory = await addCategory.save()

    if(!saveCategory){
      return res.status(500).json({
        message:"Not Created",
        error:true,
        success:false
      })
    }
    return res.json({
      message:"Add Category",
      data:saveCategory,
      success:true,
      error:false
    })

   
  } catch (err) {
    res.status(500).json({
       success: false, 
       message: err.message 
      });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.json({ success: true, message: "Category Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
