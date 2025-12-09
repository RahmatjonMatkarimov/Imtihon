import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Comment, Product])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule { }
