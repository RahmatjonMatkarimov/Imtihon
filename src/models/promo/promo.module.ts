import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Promo } from './entities/promo.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { PromoUsage } from './entities/promo-usage.entity';
import { Purchase } from '../purchase/entities/purchase.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Promo, User, Product, PromoUsage,Purchase]),AuthModule],
  controllers: [PromoController],
  providers: [PromoService],
})
export class PromoModule { }
