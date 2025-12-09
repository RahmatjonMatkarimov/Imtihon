import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from 'src/models/auth/entities/auth.entity';
import { User } from './entities/user.entity';
import { PromoUsage } from '../promo/entities/promo-usage.entity';
import { Purchase } from '../purchase/entities/purchase.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Auth, PromoUsage, Purchase],), AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
