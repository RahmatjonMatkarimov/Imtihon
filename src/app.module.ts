import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './models/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './models/auth/entities/auth.entity';
import { BotsModule } from './models/bots/bots.module';
import { Bot } from './models/bots/entities/bot.entity';
import { StudentsModule } from './models/students/students.module';
import { AdminsModule } from './models/admins/admins.module';
import { Admin } from './models/admins/entities/admin.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TeacherModule } from './models/teachers/teachers.module';
import { Teacher } from './models/teachers/entities/teacher.entity';
import { GroupModule } from './models/group/group.module';
import { Group } from './models/group/entities/group.entity';
import { ReportModule } from './models/report/report.module';
import { GroupStudent } from './models/group/entities/group-student.entity';
import { Student } from './models/students/entities/student.entity';
import { PaymentsModule } from './models/payments/payments.module';
import { AttendanceModule } from './models/attendance/attendance.module';
import { Attendance } from './models/attendance/entities/attendance.entity';
import { Payment } from './models/payments/entities/payment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Auth, Bot, Admin, Teacher, Student, Group, GroupStudent, Attendance,Payment],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      exclude: ['/api*'],
    }),
    AuthModule,
    BotsModule,
    StudentsModule,
    AdminsModule,
    TeacherModule,
    GroupModule,
    ReportModule,
    PaymentsModule,
    AttendanceModule,
  ],
})
export class AppModule { }
