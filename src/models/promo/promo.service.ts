import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Promo } from './entities/promo.entity';

@Injectable()
export class PromoService {
  constructor(@InjectModel(Promo) private promoModel: typeof Promo) { }

  async create(createPromoDto: CreatePromoDto) {
    const promo = await this.promoModel.create({ ...createPromoDto });
    return promo;
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
