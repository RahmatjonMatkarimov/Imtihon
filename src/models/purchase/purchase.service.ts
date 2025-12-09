import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase) private purchaseModel: typeof Purchase,
    @InjectModel(ShoppingCart) private shoppingCartModel: typeof ShoppingCart
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { user_id, product_ids } = createPurchaseDto;

    for (const productId of product_ids) {
      const isExist = await this.shoppingCartModel.findOne({
        where: { user_id, product_id: productId }
      });

      if (!isExist) {
        throw new NotFoundException('Product not found');
      }
    }

    const purchase = await this.purchaseModel.create({ ...createPurchaseDto });

    for (const productId of product_ids) {
      await this.shoppingCartModel.destroy({
        where: { user_id, product_id: productId }
      });
    }

    return {
      message: 'Xarid muvaffaqiyatli yakunlandi',
      purchase,
    };
  }

  async findAll() {
    return await this.purchaseModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const purchase = await this.purchaseModel.findByPk(id, {
      include: { all: true },
    });

    if (!purchase) {
      throw new NotFoundException('Purchase topilmadi');
    }

    return purchase;
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const purchase = await this.purchaseModel.findByPk(id);
    if (!purchase) {
      throw new NotFoundException('Purchase topilmadi');
    }

    return await purchase.update(updatePurchaseDto);
  }

  async remove(id: number) {
    const purchase = await this.purchaseModel.findByPk(id);
    if (!purchase) {
      throw new NotFoundException('Purchase topilmadi');
    }

    await purchase.destroy();

    return { message: 'Purchase o‘chirildi' };
  }
}
