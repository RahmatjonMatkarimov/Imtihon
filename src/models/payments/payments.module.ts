import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { Student } from '../students/entities/student.entity';
import { Group } from '../group/entities/group.entity';
import { GroupStudent } from '../group/entities/group-student.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([
    Payment,
    Student,
    Group,
    GroupStudent,
  ]),
    AuthModule
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule { }
