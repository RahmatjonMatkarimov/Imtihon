import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Promo } from './entities/promo.entity';

@Module({
  imports:[SequelizeModule.forFeature([Promo])],
  controllers: [PromoController],
  providers: [PromoService],
})
export class PromoModule {}
