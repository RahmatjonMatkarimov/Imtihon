import { Router } from "express";
import {
  PostProduct,
  GetProducts,
  GetOneProduct,
  PutProduct,
  DeleteProduct,
  likes,
  Cards,
} from "../controller/products.controller.ts";
import upload from "../utils/file_upload.ts";
import auth from "../middleware/auth.middleware.ts";
import adminAuth from "../middleware/adminCheck.middleware.ts";

export const ProductRouter = Router();

ProductRouter.post("/product", upload.array("images"), adminAuth, PostProduct);
ProductRouter.get("/product", auth, GetProducts);
ProductRouter.get("/product/:id", auth, GetOneProduct);
ProductRouter.put("/product/:id", adminAuth, PutProduct);
ProductRouter.delete("/product/:id", adminAuth, DeleteProduct);
ProductRouter.get("/likes", auth, likes);
ProductRouter.get("/card", auth, Cards);