import {
  Controller, Post, Body, UploadedFile, UseInterceptors,
  Get, Param, Patch, Delete, BadRequestException,
  Query, ParseIntPipe
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish', description: 'Rasm bilan yangi admin yaratish' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_admin' },
        email: { type: 'string', example: 'admin@example.com' },
        password: { type: 'string', example: 'SecurePass123!' },
        phone: { type: 'string', example: '+998901234567' },
        img: {
          type: 'string',
          format: 'binary',
          description: 'Admin rasmi (JPG, JPEG, PNG, max 5MB)',
        },
      },
      required: ['username', 'email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Admin muvaffaqiyatli yaratildi',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Royxatdan otdingiz' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Noto\'g\'ri ma\'lumot yoki foydalanuvchi allaqachon mavjud',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Foydalanuvchi allaqachon mavjud' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
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
    @Body() createAdminDto: CreateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const img = file ? `/uploads/${file.filename}` : '';
    return this.adminsService.create(createAdminDto, img);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni olish', description: 'Qidiruv va pagination bilan adminlar ro\'yxati' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Username, email yoki telefon raqami bo\'yicha qidirish',
    example: 'john',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Sahifa raqami',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Har bir sahifadagi adminlar soni',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Adminlar ro\'yxati muvaffaqiyatli qaytarildi',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              username: { type: 'string', example: 'john_admin' },
              email: { type: 'string', example: 'admin@example.com' },
              phone: { type: 'string', example: '+998901234567' },
              img: { type: 'string', example: '/uploads/img-1234567890.jpg' },
              role: { type: 'string', example: 'admin' },
              createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
              updatedAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
            },
          },
        },
        total: { type: 'number', example: 50 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
      },
    },
  })
  async findAll(
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return this.adminsService.findAll(search, pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta adminni olish', description: 'ID orqali bitta adminni olish' })
  @ApiParam({
    name: 'id',
    description: 'Admin ID raqami',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Admin muvaffaqiyatli topildi',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        username: { type: 'string', example: 'john_admin' },
        email: { type: 'string', example: 'admin@example.com' },
        phone: { type: 'string', example: '+998901234567' },
        img: { type: 'string', example: '/uploads/img-1234567890.jpg' },
        role: { type: 'string', example: 'admin' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        updatedAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Admin topilmadi',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Admin topilmadi' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Adminni yangilash', description: 'ID orqali adminni yangilash' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    description: 'Admin ID raqami',
    example: 1,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_admin_updated' },
        email: { type: 'string', example: 'admin_updated@example.com' },
        password: { type: 'string', example: 'NewSecurePass123!' },
        phone: { type: 'string', example: '+998909876543' },
        img: {
          type: 'string',
          format: 'binary',
          description: 'Yangi admin rasmi (JPG, JPEG, PNG, max 5MB)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Admin muvaffaqiyatli yangilandi',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Admin yangilandi' },
        admin: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'john_admin_updated' },
            email: { type: 'string', example: 'admin_updated@example.com' },
            phone: { type: 'string', example: '+998909876543' },
            img: { type: 'string', example: '/uploads/img-9876543210.jpg' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Admin topilmadi',
  })
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
    @Param('id', ParseIntPipe) id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const img = file ? `/uploads/${file.filename}` : '';
    return this.adminsService.update(+id, updateAdminDto, img);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Adminni o\'chirish', description: 'ID orqali adminni o\'chirish' })
  @ApiParam({
    name: 'id',
    description: 'Admin ID raqami',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Admin muvaffaqiyatli o\'chirildi',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Admin o\'chirildi' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Admin topilmadi',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.adminsService.remove(+id);
  }
}