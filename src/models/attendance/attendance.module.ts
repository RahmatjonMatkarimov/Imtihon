// src/attendance/attendance.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities/attendance.entity';
import { GroupStudent } from '../group/entities/group-student.entity';
import { Student } from '../students/entities/student.entity';
import { Group } from '../group/entities/group.entity';
import { AuthModule } from 'src/models/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Attendance,    
      GroupStudent,  
      Student,      
      Group,    
    ]),
    AuthModule
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}