import { Purchase } from 'src/models/purchase/entities/purchase.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentModel: typeof Comment,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(Purchase) private purchaseModel: typeof Purchase,
  ) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { user_id, product_id, comment, rating } = createCommentDto;

    const user = await this.userModel.findByPk(user_id);
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productModel.findByPk(product_id);
    if (!product) throw new NotFoundException('Product not found');

    const purchase = await this.purchaseModel.findAll({ where: { user_id } });
    if (!purchase || purchase.length === 0) {
      throw new NotFoundException('Avval mahsulotni sotib oling');
    }


    const newComment = await this.commentModel.create({
      user_id,
      product_id,
      comment,
      rating,
    });

    return newComment;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.findAll({
      include: [User, Product],
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentModel.findByPk(id, {
      include: [User, Product],
    });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.findByPk(id);
    if (!comment) throw new NotFoundException('Comment not found');

    if (updateCommentDto.user_id) {
      const user = await this.userModel.findByPk(updateCommentDto.user_id);
      if (!user) throw new NotFoundException('User not found');
    }

    if (updateCommentDto.product_id) {
      const product = await this.productModel.findByPk(updateCommentDto.product_id);
      if (!product) throw new NotFoundException('Product not found');
    }

    await comment.update(updateCommentDto);
    return comment;
  }

  async remove(id: number): Promise<void> {
    const comment = await this.commentModel.findByPk(id);
    if (!comment) throw new NotFoundException('Comment not found');
    await comment.destroy();
  }
}
