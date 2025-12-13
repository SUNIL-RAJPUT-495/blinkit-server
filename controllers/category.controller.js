import CategoryModel from "../model/category.model.js"
import SubCategoryModel from '../model/subcatogory.model.js'
import ProductModel from '../model/product.model.js'

export const AddCategoryController = async(request,response)=>{
    try {
        const { name , image } = request.body 

        if(!name || !image){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const addCategory = new CategoryModel({
            name,
            image
        })

        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return response.status(500).json({
                message : "Not Created",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Add Category",
            data : saveCategory,
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController = async(req,res)=>{
    try {
        
        const data = await CategoryModel.find()

        return res.json({
            message: "All categories fetched",
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.messsage || error,
            error : true,
            success : false
        })
    }
}




export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: "Name and image required", success: false, error: true });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, image },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found", success: false, error: true });
    }

    return res.json({
      message: "Category updated successfully",
      success: true,
      error: false,
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false, error: true });
  }
};




export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    // Check usage
    const subCategoryCount = await SubCategoryModel.countDocuments({ category: id });
    const productCount = await ProductModel.countDocuments({ category: id });

    if (subCategoryCount > 0 || productCount > 0) {
      return res.status(400).json({
        message: "Category is already used, can't delete",
        success: false,
        error: true,
      });
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found", success: false, error: true });
    }

    return res.json({
      message: "Category deleted successfully",
      success: true,
      error: false,
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false, error: true });
  }
};
