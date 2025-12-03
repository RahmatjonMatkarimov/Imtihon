import {
  Controller, Post, Body,
  Get, Param, Patch, Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_admin' },
        email: { type: 'string', example: 'admin@example.com' },
        password: { type: 'string', example: 'SecurePass123!' },
      },
      required: ['username', 'email', 'password'],
    },
  })
  @ApiResponse({ status: 201, description: 'Admin muvaffaqiyatli yaratildi' })
  @ApiBadRequestResponse({ description: 'Noto\'g\'ri ma\'lumot yoki foydalanuvchi allaqachon mavjud' })
  create(@Body() createAdminDto: CreateUserDto) {
    return this.usersService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  @ApiQuery({ name: 'search', required: false, description: 'Username yoki email bo\'yicha qidirish' })
  @ApiQuery({ name: 'page', required: false, type: 'number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: 'number', example: 10 })
  @ApiResponse({ status: 200, description: 'Adminlar ro\'yxati' })
  async findAll(
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return this.usersService.findAll(search, pageNum, limitNum);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta adminni olish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Admin topildi' })
  @ApiNotFoundResponse({ description: 'Admin topilmadi' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Adminni yangilash' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'john_admin_updated' },
        email: { type: 'string', example: 'admin_updated@example.com' },
        password: { type: 'string', example: 'NewSecurePass123!' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Admin yangilandi' })
  @ApiNotFoundResponse({ description: 'Admin topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Adminni o\'chirish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Admin o\'chirildi' })
  @ApiNotFoundResponse({ description: 'Admin topilmadi' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}