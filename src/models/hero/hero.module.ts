import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hero } from './entities/hero.entity';

@Module({
  imports: [SequelizeModule.forFeature([Hero])],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
