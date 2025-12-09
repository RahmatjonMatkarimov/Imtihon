import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Purchase } from '../purchase/entities/purchase.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Product, ShoppingCart,Purchase])],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule { }
