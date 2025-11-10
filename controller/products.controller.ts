import type { NextFunction, Request, Response } from "express";
import { category, product } from "../model/association.ts";
import CustomErrorHandler from "../error/custom-error-handler.ts";
import type { CreateProductDTO, UpdateProductDTO } from "../dto/products.dto.ts";
import { Op } from "sequelize";

product.sync({ force: false })

export const PostProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            description,
            price,
            discount,
            color,
            size,
            rating,
            images,
            user_id,
            paymentType,
            category_id,
        } = req.body;

        const newProduct = await product.create({
            name,
            description,
            price,
            discount: discount || 0,
            color,
            size,
            rating: rating || 0,
            images,
            paymentType,
            user_id,
            category_id,
        }) as unknown as CreateProductDTO;

        res.status(201).json({
            message: "Product created",
            data: newProduct,
        });
    } catch (err) {
        next(err);
    }
};

export const GetProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await product.findAll();

        res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
};

export const GetOneProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const foundProduct = await product.findByPk(id);
        const products = await category.findByPk(foundProduct?.category_id);

        if (!foundProduct) {
            throw CustomErrorHandler.NotFound("Product not found");
        }

        res.status(200).json({
            data: foundProduct,
            products
        });
    } catch (err) {
        next(err);
    }
};

export const PutProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const foundProduct = await product.findByPk(id);

        if (!foundProduct) {
            throw CustomErrorHandler.NotFound("Product not found");
        }

        await foundProduct.update(req.body) as UpdateProductDTO;

        res.status(200).json({
            message: "Product updated",
            data: foundProduct,
        });
    } catch (err) {
        next(err);
    }
};

export const DeleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const foundProduct = await product.findByPk(id);

        if (!foundProduct) {
            throw CustomErrorHandler.NotFound("Product not found");
        }

        await foundProduct.destroy();

        res.status(200).json({
            message: "Product deleted",
        });
    } catch (err) {
        next(err);
    }
};

export const Cards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?._id

        const cardProducts = await product.findAll({ where: { user_id: id, isCard: true, }, });

        res.status(200).json({
            message: "card products",
            data: cardProducts,
        });
    } catch (err) {
        next(err);
    }
};

export const addcard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { isCard } = req.body;

        const foundProduct = await product.findByPk(id);

        if (!foundProduct) {
            throw CustomErrorHandler.NotFound("Product not found");
        }

        if (!isCard || typeof isCard !== "boolean") {
            throw CustomErrorHandler.NotFound("isCard is not a boolean or not found");
        }

        await foundProduct.update({ isCard });

        res.status(200).json({
            message: "Product updated",
            data: foundProduct,
        });
    } catch (err) {
        next(err);
    }
};

export const likes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?._id

        const cardProducts = await product.findAll({ where: { user_id: id, isLike: true, }, });

        res.status(200).json({
            message: "like products",
            data: cardProducts,
        });
    } catch (err) {
        next(err);
    }
};

export const addLikesProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { isLike } = req.body;

        const foundProduct = await product.findByPk(id);

        if (!foundProduct) {
            throw CustomErrorHandler.NotFound("Product not found");
        }

        if (!isLike || typeof isLike !== "boolean") {
            throw CustomErrorHandler.NotFound("isLike is not a boolean or not found");
        }

        await foundProduct.update({ isLike });

        res.status(200).json({
            message: "Product updated",
            data: foundProduct,
        });
    } catch (err) {
        next(err);
    }
};

export const search = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search } = req.query;

        const products = await product.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        });

        res.status(200).json({
            products
        });

    } catch (err) {
        next(err);
    }
}

export const topRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await product.findAll({
            order: [['rating', 'DESC']]
        });

        res.status(200).json({
            products
        });
    } catch (err) {
        next(err);
    }
}
