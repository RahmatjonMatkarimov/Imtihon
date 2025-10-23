const { Router } = require("express");
const {
    PostCategory,
    PutCategory,
    GetCategory,
    GetOneCategory,
    DeleteCategory
} = require("../controller/category.controller");
const upload = require("../utils/file_upload");
const categoriesRouter = Router()

categoriesRouter.get("/category", GetCategory)
categoriesRouter.get("/category/:id", GetOneCategory)
categoriesRouter.post("/category", upload.single("img"), PostCategory)
categoriesRouter.put("/category/:id", upload.single("img"), PutCategory)
categoriesRouter.delete("/category/:id", DeleteCategory)

module.exports = categoriesRouter
