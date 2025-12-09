import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Admin } from '../admins/entities/admin.entity';
import { Category } from '../category/entities/category.entity';
import { Comment } from '../comments/entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(Category) private categoryModel: typeof Category,
    @InjectModel(Comment) private commentModel: typeof Comment,
    @InjectModel(User) private userModel: typeof User,
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

  async findAll(query: any) {
    const {
      page = 1,
      limit = 12,
      minPrice,
      maxPrice,
      category_id,
      owner_id,
      search,
      ...attrs
    } = query;

    const offset = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.title = { [Op.iLike]: `%${search}%` };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    if (category_id) where.category_id = category_id;
    if (owner_id) where.owner_id = owner_id;
    for (const key in attrs) {
      if (attrs[key] !== undefined) {
        where[`attributes.${key}`] = attrs[key];
      }
    }

    const products = await this.productModel.findAndCountAll({
      where,
      include: [
        Admin,
        Category,
        { model: Comment, include: [User], separate: true }
      ],
      limit: Number(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      total: products.count,
      pages: Math.ceil(products.count / limit),
      currentPage: Number(page),
      items: products.rows,
    };
  }

async findOne(id: number) {
  const product = await this.productModel.findByPk(id, {
    include: [
      Admin,
      Category,
      {
        model: Comment,
        include: [User],
        separate: true,
        order: [['createdAt', 'DESC']],
      },
    ],
  });

  if (!product) throw new NotFoundException('Product not found');

  const comments = product.comments || [];
  const totalReviews = comments.length;
  const ratingCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  comments.forEach(c => {
    const r = Math.round(c.rating);
    if (r >= 1 && r <= 5) ratingCount[r]++;
  });

  const averageRating: any = totalReviews 
    ? (comments.reduce((sum, c) => sum + c.rating, 0) / totalReviews).toFixed(1) 
    : 0;

  const recommendations = await this.productModel.findAll({
    where: {
      category_id: product.category_id,
      id: { [Op.ne]: product.id },
    },
    limit: 5, 
    include: [Admin, Category],
    order: [['createdAt', 'DESC']],
  });

  return {
    ...product.toJSON(),
    rating: {
      average: parseFloat(averageRating),
      totalReviews,
      breakdown: {
        excellent: ratingCount[5],
        good: ratingCount[4],
        average: ratingCount[3],
        belowAverage: ratingCount[2],
        poor: ratingCount[1],
      }
    },
    recommendations, 
  };
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
