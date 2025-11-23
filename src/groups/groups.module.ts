import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { GroupStudent } from './entities/group-student.entity';
import { Auth } from '../auth/entities/auth.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Group,     
      GroupStudent, 
      Auth,    
    ]),
    AuthModule
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}