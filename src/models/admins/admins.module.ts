import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';
import { Auth } from 'src/models/auth/entities/auth.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, Auth]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule { }
