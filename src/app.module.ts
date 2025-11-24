import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './auth/entities/auth.entity';
import { BotsModule } from './bots/bots.module';
import { Bot } from './bots/entities/bot.entity';
import { StudentsModule } from './students/students.module';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/entities/admin.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TeacherModule } from './teachers/teachers.module';
import { Teacher } from './teachers/entities/teacher.entity';
import { GroupModule } from './group/group.module';
import { Group } from './group/entities/group.entity';
import { ReportModule } from './report/report.module';
import { GroupStudent } from './group/entities/group-student.entity';
import { Student } from './students/entities/student.entity';
import { PaymentsModule } from './payments/payments.module';

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
      models: [Auth, Bot, Admin, Teacher, Student, Group, GroupStudent],
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
  ],
})
export class AppModule { }
