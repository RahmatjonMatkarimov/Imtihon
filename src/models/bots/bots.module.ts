import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './entities/bot.entity';
import { BotsController } from './bots.controller';
import { AuthModule } from 'src/models/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Bot]), AuthModule],
  controllers: [BotsController],
  providers: [BotsService],
})
export class BotsModule { }
