import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { HeroService } from './hero.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('hero')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Yangi hero yaratish' })
  @ApiBody({ type: CreateHeroDto })
  @ApiResponse({ status: 201, description: 'Hero yaratildi' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/hero',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `hero-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Faqat rasm fayllari ruxsat etilgan!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(@Body() dto: CreateHeroDto, @UploadedFile() file: Express.Multer.File) {
    return this.heroService.create(dto, file);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha hero larni olish' })
  @ApiResponse({ status: 200, description: 'Herolar ro‘yxati' })
  findAll() {
    return this.heroService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Bitta hero ni olish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Hero topildi' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.heroService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Hero ni yangilash' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateHeroDto })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/hero',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `hero-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHeroDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.heroService.update(id, dto, file);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Hero ni o‘chirish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Hero o‘chirildi' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.heroService.remove(id);
  }
}
