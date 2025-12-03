import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from 'src/models/auth/entities/auth.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Auth]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
