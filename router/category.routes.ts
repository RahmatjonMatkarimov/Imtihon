import { PostCategory, GetCategory, GetOneCategory, PutCategory, DeleteCategory} from "../controller/category.controller.ts";
import adminAuth from "../middleware/adminCheck.middleware.ts";
import auth from "../middleware/auth.middleware.ts";
import upload from "../utils/file_upload.ts";
import { Router } from "express";

export const categoryRouter = Router();

categoryRouter.post("/category", upload.single("image"), adminAuth, PostCategory);
categoryRouter.get("/category", auth, GetCategory);
categoryRouter.get("/category/:id", auth, GetOneCategory);
categoryRouter.put("/category/:id", upload.single("image"), adminAuth, PutCategory);
categoryRouter.delete("/category/:id", adminAuth, DeleteCategory);
