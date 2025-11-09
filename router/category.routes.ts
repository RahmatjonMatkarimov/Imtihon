import { Router } from "express";
import {
  PostCategory,
  GetCategory,
  GetOneCategory,
  PutCategory,
  DeleteCategory,
} from "../controller/category.controller.ts";

export const categoryRouter = Router();

categoryRouter.post("/category", PostCategory);
categoryRouter.get("/category", GetCategory);
categoryRouter.get("/category/:id", GetOneCategory);
categoryRouter.put("/category/:id", PutCategory);
categoryRouter.delete("/category/:id", DeleteCategory);
