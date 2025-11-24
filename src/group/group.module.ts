import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './entities/group.entity';
import { GroupStudent } from './entities/group-student.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Group,
      GroupStudent,
      Teacher,
      Student,
    ]),
    AuthModule
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule { }