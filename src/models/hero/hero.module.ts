import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hero } from './entities/hero.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Hero]),AuthModule],
  controllers: [HeroController],
  providers: [HeroService],
})
export class HeroModule {}
