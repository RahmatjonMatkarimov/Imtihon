const { Router } = require("express");
const {
    PostCategory,
    PutCategory,
    GetCategory,
    GetOneCategory,
    DeleteCategory
} = require("../controller/category.controller");
const upload = require("../utils/file_upload");
const adminCheckMiddleware = require("../middleware/adminCheck.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const categoryValidatorMiddleware = require("../middleware/category.validator.middleware");
const categoriesRouter = Router()

categoriesRouter.get("/category",authMiddleware, GetCategory)
categoriesRouter.get("/category/:id",authMiddleware, GetOneCategory)
categoriesRouter.post("/category", upload.single("img"), adminCheckMiddleware,categoryValidatorMiddleware, PostCategory)
categoriesRouter.put("/category/:id", upload.single("img"), adminCheckMiddleware, PutCategory)
categoriesRouter.delete("/category/:id", adminCheckMiddleware, DeleteCategory)

module.exports = categoriesRouter
