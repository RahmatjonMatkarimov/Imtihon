import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from 'src/models/students/entities/student.entity';
import { Teacher } from 'src/models/teachers/entities/teacher.entity';
import { Group } from 'src/models/group/entities/group.entity';
import { AuthModule } from 'src/models/auth/auth.module';
import { GroupStudent } from 'src/models/group/entities/group-student.entity';

@Module({
  imports: [SequelizeModule.forFeature([Student, Teacher, Group,GroupStudent]),AuthModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule { }
