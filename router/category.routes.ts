import { Router } from "express";
import {
    PostCategory,
    GetCategory,
    GetOneCategory,
    PutCategory,
    DeleteCategory,
} from "../controller/category.controller.ts";
import adminAuth from "../middleware/adminCheck.middleware.ts";
import auth from "../middleware/auth.middleware.ts";

export const categoryRouter = Router();

categoryRouter.post("/category", adminAuth, PostCategory);
categoryRouter.get("/category", auth, GetCategory);
categoryRouter.get("/category/:id", auth, GetOneCategory);
categoryRouter.put("/category/:id", adminAuth, PutCategory);
categoryRouter.delete("/category/:id", adminAuth, DeleteCategory);
