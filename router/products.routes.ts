import { PostProduct, GetProducts, GetOneProduct, PutProduct, DeleteProduct, likes, Cards, search, addLikesProduct, addcard, topRating, } from "../controller/products.controller.ts";
import adminAuth from "../middleware/adminCheck.middleware.ts";
import auth from "../middleware/auth.middleware.ts";
import upload from "../utils/file_upload.ts";
import { Router } from "express";

export const ProductRouter = Router();

ProductRouter.post("/product", upload.array("images"), adminAuth, PostProduct);
ProductRouter.put("/product/:id", upload.array("images"), adminAuth, PutProduct);
ProductRouter.delete("/product/:id", adminAuth, DeleteProduct);
ProductRouter.put("/addLikesProduct/:id", auth, addLikesProduct);
ProductRouter.get("/product/:id", auth, GetOneProduct);
ProductRouter.put("/addcartProduct/:id", auth, addcard);
ProductRouter.get("/product", auth, GetProducts);
ProductRouter.get("/top", auth, topRating);
ProductRouter.get("/search", auth, search);
ProductRouter.get("/likes", auth, likes);
ProductRouter.get("/card", auth, Cards);