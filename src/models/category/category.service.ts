import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) { }

  async create(dto: CreateCategoryDto, file: Express.Multer.File) {
    const img = file ? file.filename : '';
    return await this.categoryModel.create({ ...dto, img });
  }

  async findAll() {
    return await this.categoryModel.findAll();
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) throw new NotFoundException(`Category topilmadi`);
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException(`Category topilmadi`);
    const updateData: any = { ...dto };
    if (file) {
      if (category.img) {
        const oldPath = join(__dirname, '..', '..', 'uploads', category.img);
        if (existsSync(oldPath)) unlinkSync(oldPath);
      }
      updateData.img = file.filename;
    }

    await category.update(updateData);
    return category.reload();
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) throw new NotFoundException(`Category topilmadi`);
    if (category.img) {
      const filePath = join(__dirname, '..', '..', 'uploads', category.img);
      if (existsSync(filePath)) unlinkSync(filePath);
    }

    await category.destroy();
    return { message: 'Category o\'chirildi' };
  }
}