import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('products')
@ApiBearerAuth('access-token')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot yaratish' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Mahsulot ma\'lumotlari va rasm fayllari',
    type: CreateProductDto,
  })
  @ApiResponse({ status: 201, description: 'Mahsulot muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Noto\'g\'ri ma\'lumotlar' })
  @ApiResponse({ status: 401, description: 'Avtorizatsiya xatosi' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo\'q' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Faqat rasm fayllari ruxsat etilgan!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsService.create(createDto, files);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get()
  @ApiOperation({ summary: 'Barcha mahsulotlarni olish' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Sahifa raqami', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Bir sahifadagi elementlar soni', example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Qidiruv so\'zi', example: 'Smartphone' })
  @ApiResponse({ status: 200, description: 'Mahsulotlar ro\'yxati' })
  @ApiResponse({ status: 401, description: 'Avtorizatsiya xatosi' })
  findAll(@Query() query: any) {
    return this.productsService.findAll(query);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  @Get(':id')
  @ApiOperation({ summary: 'Bitta mahsulotni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Mahsulot ID si', example: 1 })
  @ApiResponse({ status: 200, description: 'Mahsulot topildi' })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  @ApiResponse({ status: 401, description: 'Avtorizatsiya xatosi' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Mahsulotni yangilash' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: Number, description: 'Mahsulot ID si', example: 1 })
  @ApiBody({
    description: 'Yangilanayotgan mahsulot ma\'lumotlari',
    type: UpdateProductDto,
  })
  @ApiResponse({ status: 200, description: 'Mahsulot muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 400, description: 'Noto\'g\'ri ma\'lumotlar' })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  @ApiResponse({ status: 401, description: 'Avtorizatsiya xatosi' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo\'q' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Faqat rasm fayllari ruxsat etilgan!'), false);
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsService.update(id, updateDto, files);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Mahsulotni o\'chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Mahsulot ID si', example: 1 })
  @ApiResponse({ status: 200, description: 'Mahsulot muvaffaqiyatli o\'chirildi' })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  @ApiResponse({ status: 401, description: 'Avtorizatsiya xatosi' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo\'q' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}