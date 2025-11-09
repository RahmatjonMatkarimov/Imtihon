import { Router } from "express";
import {
  PostProduct,
  GetProducts,
  GetOneProduct,
  PutProduct,
  DeleteProduct,
} from "../controller/products.controller.ts";
import upload from "../utils/file_upload.ts";

export const ProductRouter = Router();

ProductRouter.post("/product", upload.array("images"), PostProduct);
ProductRouter.get("/product", GetProducts);
ProductRouter.get("/product/:id", GetOneProduct);
ProductRouter.put("/product/:id", PutProduct);
ProductRouter.delete("/product/:id", DeleteProduct);