import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from 'src/auth/entities/auth.entity';
import { TeacherService } from './teachers.service';
import { TeacherController } from './teachers.controller';
import { Teacher } from './entities/teacher.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Teacher, Auth]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule { }
