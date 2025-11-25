import {
  Controller, Post, Body, UploadedFile, UseInterceptors,
  Get, Param, Patch, Delete, Query, BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi talaba yaratish' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Talaba yaratildi' })
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
    @Body() createStudentDto: CreateStudentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const img = file ? `/uploads/${file.filename}` : '';
    return this.studentService.create(createStudentDto, img);
  }

  @Get()
  @ApiOperation({ summary: 'Talabalarni listlash' })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.studentService.findAll(search, parseInt(page), parseInt(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Talabani ID bo‘yicha olish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Talaba topildi' })
  @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Talabani yangilash' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Talaba yangilandi' })
  @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
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
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const img = file ? `/uploads/${file.filename}` : '';
    return this.studentService.update(+id, updateStudentDto, img);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Talabani o‘chirish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Talaba o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
