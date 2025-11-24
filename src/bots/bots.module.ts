import { Module } from '@nestjs/common';
import { BotsService } from './bots.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './entities/bot.entity';
import { BotsController } from './bots.controller';

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  controllers: [BotsController],
  providers: [BotsService],
})
export class BotsModule { }
