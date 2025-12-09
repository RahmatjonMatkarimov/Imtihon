import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { Auth } from 'src/models/auth/entities/auth.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, Auth]),
    AuthModule
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule { }
