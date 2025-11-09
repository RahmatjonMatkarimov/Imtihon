import type { NextFunction, Request, Response } from "express";
import CustomErrorHandler from "../error/custom-error-handler.ts";
import { category } from "../model/association.ts";
import type { CreateCategoryDTO, UpdateCategoryDTO } from "../dto/category.dto.ts";

category.sync({ force: false })

export const PostCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, owner_id } = req.body;

        await category.create({
            name,
            owner_id,
        }) as CreateCategoryDTO;

        res.status(201).json({
            message: "Category created",
        });
    } catch (err) {
        next(err);
    }
};

export const GetCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await category.findAll();

        res.status(200).json({
            categories,
        });
    } catch (err) {
        next(err);
    }
};

export const GetOneCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const foundCategory = await category.findByPk(id, {
            include: ["products"],
        });

        if (!foundCategory) {
            throw CustomErrorHandler.NotFound("Category not found");
        }

        res.status(200).json({
            data: foundCategory,
        });
    } catch (err) {
        next(err);
    }
};

export const PutCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const foundCategory = await category.findByPk(id);

        if (!foundCategory) {
            throw CustomErrorHandler.NotFound("Category not found");
        }

        await foundCategory.update({ name }) as UpdateCategoryDTO;

        res.status(200).json({
            message: "Category updated",
        });
    } catch (err) {
        next(err);
    }
};

export const DeleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const foundCategory = await category.findByPk(id);

        if (!foundCategory) {
            throw CustomErrorHandler.NotFound("Category not found");
        }

        await foundCategory.destroy();

        res.status(200).json({
            message: "Category deleted",
        });
    } catch (err) {
        next(err);
    }
};
