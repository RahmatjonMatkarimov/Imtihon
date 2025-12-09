import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Purchase } from './entities/purchase.entity';
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity';
import { Product } from '../products/entities/product.entity';
import { PromoUsage } from '../promo/entities/promo-usage.entity';
import { Promo } from '../promo/entities/promo.entity';

@Module({
  imports: [SequelizeModule.forFeature([Purchase, ShoppingCart, Product, PromoUsage,Promo])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }
