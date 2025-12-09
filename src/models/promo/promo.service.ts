import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Promo } from './entities/promo.entity';
import { PromoUsage } from './entities/promo-usage.entity';

@Injectable()
export class PromoService {
  constructor(
    @InjectModel(Promo) private promoModel: typeof Promo,
    @InjectModel(PromoUsage) private promoUsageModel: typeof PromoUsage,
  ) { }

  async create(createPromoDto: CreatePromoDto) {
    const promo = await this.promoModel.create({ ...createPromoDto });
    return promo;
  }

  async usePromo(userId: number, promoCode: string, prodoct_id: number) {
    const promo = await this.promoModel.findOne({ where: { promoCode } });

    if (!promo) throw new NotFoundException("Promo code topilmadi");

    if (promo.endDate < new Date()) {
      throw new BadRequestException("Promo code muddati tugagan");
    }

    const used = await this.promoUsageModel.findOne({
      where: { userId, promoId: promo.id }
    });

    if (used) {
      throw new BadRequestException("Siz bu promo code’ni allaqachon ishlatgansiz");
    }

    await this.promoUsageModel.create({
      userId,
      promoId: promo.id,
      prodoct_id
    });

    return {
      message: "Promo code muvaffaqiyatli qo'llandi",
      discount: promo.price
    };
  }

  async findAll() {
    return await this.promoModel.findAll();
  }

  async findOne(id: number) {
    const promo = await this.promoModel.findByPk(id);
    if (!promo) throw new NotFoundException('Promo not found');
    return promo;
  }

  async update(id: number, updatePromoDto: UpdatePromoDto) {
    const promo = await this.findOne(id);
    return await promo.update(updatePromoDto);
  }

  async remove(id: number) {
    const promo = await this.findOne(id);
    await promo.destroy();
    return { message: 'Promo deleted successfully' };
  }
}
