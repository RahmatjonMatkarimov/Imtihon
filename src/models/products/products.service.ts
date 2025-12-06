import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Admin } from '../admins/entities/admin.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(Category) private categoryModel: typeof Category,
  ) { }

  async create(createDto: CreateProductDto, files: Express.Multer.File[]) {
    const images = files?.map((f) => f.filename) || [];

    const admin = await this.adminModel.findByPk(createDto.owner_id);
    if (!admin) throw new NotFoundException('Owner (Admin) not found');

    const category = await this.categoryModel.findByPk(createDto.category_id);
    if (!category) throw new NotFoundException('Category not found');

    await this.productModel.create({
      ...createDto, images
    });

    return 'asd';
  }

  async findAll() {
    return this.productModel.findAll({
      include: [Admin, Category],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number) {
    const product = await this.productModel.findByPk(id, {
      include: [Admin, Category],
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(
    id: number,
    updateDto: UpdateProductDto,
    files: Express.Multer.File[],
  ) {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');

    const newImages = files?.map((file) => file.filename) || [];

    await product.update({
      ...updateDto,
      images: newImages.length ? newImages : product.images,
    });

    return product;
  }

  async remove(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');

    await product.destroy();
    return { message: 'Product removed successfully' };
  }
}
