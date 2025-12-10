import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity';
import { Product } from '../products/entities/product.entity';
import { PromoUsage } from '../promo/entities/promo-usage.entity';
import { Promo } from '../promo/entities/promo.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel(Purchase) private purchaseModel: typeof Purchase,
    @InjectModel(ShoppingCart) private shoppingCartModel: typeof ShoppingCart,
    @InjectModel(Product) private prodoctModel: typeof Product,
    @InjectModel(PromoUsage) private promoUsageModel: typeof PromoUsage,
    @InjectModel(Promo) private promoModel: typeof Promo,
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto) {
    const { user_id, product_ids, promo_id, address_id, shipmentMethod_id, card_number } = createPurchaseDto;

    let promoUsage: any = null;
    let discount = 0;
    if (promo_id) {
      promoUsage = await this.promoUsageModel.findOne({
        where: { promoId: promo_id, userId: user_id },
        include: [{ model: this.promoModel }],
      });

      if (!promoUsage) {
        const promo = await this.promoModel.findByPk(promo_id);
        if (!promo) throw new NotFoundException("Promo topilmadi");

        promoUsage = await this.promoUsageModel.create({
          promoId: promo.id,
          userId: user_id,
          product_id: product_ids[0]?.id || null, 
        });

        await promoUsage.reload({ include: [{ model: this.promoModel }] });
      }

      discount = promoUsage.promo.price;
    }
    let totalPrice = 0;

    for (const item of product_ids) {
      const cartItem = await this.shoppingCartModel.findOne({
        where: { user_id, product_id: item.id },
      });

      if (!cartItem) throw new NotFoundException(`Product savatda topilmadi`);

      const product = await this.prodoctModel.findByPk(item.id);
      if (!product) throw new NotFoundException(`Product topilmadi`);

      if (product.count < item.count) {
        throw new NotFoundException(`Product yetarli miqdorda mavjud emas`);
      }

      product.count -= item.count;
      await product.save();

      totalPrice += product.price * item.count;
    }

    if (promoUsage) {
      totalPrice -= discount;
      if (totalPrice < 0) totalPrice = 0;
    }

    const purchase = await this.purchaseModel.create({
      user_id,
      address_id,
      shipmentMethod_id,
      promo_id: promoUsage ? promoUsage.id : null,
      card_number,
      product_ids,
      totalPrice,
    });

    for (const item of product_ids) {
      await this.shoppingCartModel.destroy({
        where: { user_id, product_id: item.id },
      });
    }

    return {
      message: "Xarid muvaffaqiyatli yakunlandi",
      purchase,
    };
  }

  async findAll() {
    return await this.purchaseModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const purchase = await this.purchaseModel.findByPk(id, { include: { all: true } });
    if (!purchase) throw new NotFoundException("Purchase topilmadi");
    return purchase;
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    const purchase = await this.purchaseModel.findByPk(id);
    if (!purchase) throw new NotFoundException("Purchase topilmadi");
    return purchase.update(updatePurchaseDto);
  }

  async remove(id: number) {
    const purchase = await this.purchaseModel.findByPk(id);
    if (!purchase) throw new NotFoundException("Purchase topilmadi");
    await purchase.destroy();
    return { message: "Purchase o‘chirildi" };
  }
}
