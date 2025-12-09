import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './entities/likes-product.entity';
import { Product } from '../products/entities/product.entity';
import { LikeService } from './likes-product.service';
import { LikeController } from './likes-product.controller';

@Module({
    imports: [SequelizeModule.forFeature([Like, Product])],
    providers: [LikeService],
    controllers: [LikeController],
})
export class LikesProductModule {}
