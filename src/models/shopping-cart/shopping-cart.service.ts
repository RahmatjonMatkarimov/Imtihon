import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart) private cartModel: typeof ShoppingCart
  ) { }

  async getUserCart(userId: number) {
    return this.cartModel.findAll({
      where: { user_id: userId },
      include: [Product],
    });
  }

  async addToCart(userId: number, productId: number) {
    return this.cartModel.create({
      user_id: userId,
      product_id: productId,
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const item = await this.cartModel.findOne({
      where: { user_id: userId, product_id: productId },
    });

    if (!item) throw new NotFoundException('Mahsulot savatda topilmadi');

    await item.destroy();
    return { message: 'Mahsulot savatdan o‘chirildi' };
  }
}
