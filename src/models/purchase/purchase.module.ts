import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Purchase } from './entities/purchase.entity';
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity';

@Module({
  imports: [SequelizeModule.forFeature([Purchase,ShoppingCart])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule { }
