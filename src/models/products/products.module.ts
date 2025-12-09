import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Admin } from '../admins/entities/admin.entity';
import { User } from '../users/entities/user.entity';
import { Comment } from '../comments/entities/comment.entity';
import { ShoppingCart } from '../shopping-cart/entities/shopping-cart.entity';
import { PromoUsage } from '../promo/entities/promo-usage.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Product, Admin, Category, User, Comment, ShoppingCart, PromoUsage]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
