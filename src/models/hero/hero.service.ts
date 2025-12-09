import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hero } from './entities/hero.entity';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectModel(Hero)
    private heroModel: typeof Hero,
  ) {}

  async create(createHeroDto: CreateHeroDto, file?: Express.Multer.File) {
    const image = file ? file.filename : null;

    return await this.heroModel.create({
      ...createHeroDto,
      image,
    });
  }

  async findAll() {
    return await this.heroModel.findAll();
  }

  async findOne(id: number) {
    const hero = await this.heroModel.findByPk(id);
    if (!hero) throw new NotFoundException('Hero topilmadi');
    return hero;
  }

  async update(id: number, dto: UpdateHeroDto, file?: Express.Multer.File) {
    const hero = await this.findOne(id);

    const image = file ? file.filename : hero.image;

    await hero.update({
      ...dto,
      image,
    });

    return hero;
  }

  async remove(id: number) {
    const hero = await this.findOne(id);
    await hero.destroy();
    return { message: 'Hero o‘chirildi' };
  }
}
