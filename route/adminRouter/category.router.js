import { Router } from 'express'
import auth from '../../middleware/auth.js'
import { AddCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../../controllers/category.controller.js'

const categoryRouter = Router()

categoryRouter.post("/add-category",AddCategoryController)
categoryRouter.get('/get-category',getCategoryController)
categoryRouter.put('/update-category/:id',updateCategoryController)
categoryRouter.delete("/delete-category/:id",deleteCategoryController)

export default categoryRouter