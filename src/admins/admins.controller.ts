import {
  Controller, Post, Body, UploadedFile, UseInterceptors,
  Get, Param, Patch, Delete, BadRequestException,
  Query
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Post()
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
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
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
    @Body() updateAdminDto: UpdateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const img = file ? `/uploads/${file.filename}` : '';
    return this.adminsService.update(+id, updateAdminDto, img);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
