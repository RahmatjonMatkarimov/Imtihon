import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { Product } from '../products/entities/product.entity';
import { Purchase } from '../purchase/entities/purchase.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Comment, Product,Purchase]),AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
