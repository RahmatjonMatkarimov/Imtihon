import { StudentsService } from './students.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from 'src/models/auth/entities/auth.entity';
import { StudentController } from './students.controller';
import { Student } from './entities/student.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Student, Auth]),
  ],
  controllers: [StudentController],
  providers: [StudentsService],
})
export class StudentsModule { }
