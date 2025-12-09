import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './models/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminsModule } from './models/admins/admins.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './models/users/users.module';
import { CategoryModule } from './models/category/category.module';
import { ProductsModule } from './models/products/products.module';
import { CommentsModule } from './models/comments/comments.module';
import { ShoppingCartModule } from './models/shopping-cart/shopping-cart.module';
import { LikesProductModule } from './models/likes-product/likes-product.module';
import { PromoModule } from './models/promo/promo.module';
import { PurchaseModule } from './models/purchase/purchase.module';
import { AddressModule } from './models/address/address.module';
import { ShipmentMethodModule } from './models/shipment-method/shipment-method.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      exclude: ['/api*'],
    }),
    AuthModule,
    AdminsModule,
    UsersModule,
    CategoryModule,
    ProductsModule,
    CommentsModule,
    ShoppingCartModule,
    LikesProductModule,
    PromoModule,
    PurchaseModule,
    AddressModule,
    ShipmentMethodModule,
  ],
})
export class AppModule { }
