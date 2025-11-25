import {
  Controller, Post, Body, UploadedFile, UseInterceptors,
  Get, Param, Patch, Delete, Query, BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TeacherService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi o‘qituvchi yaratish' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'O‘qituvchi yaratildi' })
  @ApiResponse({ status: 400, description: 'Foydalanuvchi allaqachon mavjud yoki fayl noto‘g‘ri' })
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Fayl rasm bolishi kerak'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  create(
    @Body() createTeacherDto: CreateTeacherDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const img = file ? `/uploads/${file.filename}` : '';
    return this.teacherService.create(createTeacherDto, img);
  }

  @Get()
  @ApiOperation({ summary: 'O‘qituvchilarni listlash' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(@Query('search') search?: string, @Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.teacherService.findAll(search, parseInt(page), parseInt(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'O‘qituvchini ID bo‘yicha olish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'O‘qituvchi topildi' })
  @ApiResponse({ status: 404, description: 'O‘qituvchi topilmadi' })
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'O‘qituvchini yangilash' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'O‘qituvchi yangilandi' })
  @ApiResponse({ status: 404, description: 'O‘qituvchi topilmadi' })
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Fayl rasm bolishi kerak'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto, @UploadedFile() file?: Express.Multer.File) {
    const img = file ? `/uploads/${file.filename}` : '';
    return this.teacherService.update(+id, updateTeacherDto, img);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'O‘qituvchini o‘chirish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'O‘qituvchi o‘chirildi' })
  @ApiResponse({ status: 404, description: 'O‘qituvchi topilmadi' })
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
