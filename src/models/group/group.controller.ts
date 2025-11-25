import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AddStudentToGroupDto } from './dto/add-student.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@ApiTags('groups')
@ApiBearerAuth()
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiOperation({
    summary: 'Yangi guruh yaratish',
    description: 'Yangi o\'quv guruhini yaratish (faqat Admin)',
  })
  @ApiResponse({
    status: 201,
    description: 'Guruh muvaffaqiyatli yaratildi',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Frontend Development - A1' },
        lesson_days: { type: 'string', example: 'Dushanba,Chorshanba,Juma' },
        lesson_StartTime: { type: 'string', example: '09:00:00' },
        lesson_EndTime: { type: 'string', example: '11:00:00' },
        orientation: { type: 'string', example: 'Frontend Development' },
        teacher_id: { type: 'number', example: 1 },
        createdAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
        updatedAt: { type: 'string', example: '2024-01-15T10:00:00.000Z' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'O\'qituvchi topilmadi',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Ustoz topilmadi' },
      },
    },
  })
  create(@Body() dto: CreateGroupDto) {
    return this.groupService.create(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Get()
  @ApiOperation({
    summary: 'Barcha guruhlarni olish',
    description: 'Guruhlar ro\'yxatini qidiruv va pagination bilan olish (Admin va Teacher)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Guruh nomi bo\'yicha qidirish',
    example: 'Frontend',
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
    description: 'Har bir sahifadagi guruhlar soni',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Guruhlar ro\'yxati muvaffaqiyatli qaytarildi',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Frontend Development - A1' },
              lesson_days: { type: 'string', example: 'Dushanba,Chorshanba,Juma' },
              lesson_StartTime: { type: 'string', example: '09:00:00' },
              lesson_EndTime: { type: 'string', example: '11:00:00' },
              orientation: { type: 'string', example: 'Frontend Development' },
              teacher: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  username: { type: 'string', example: 'Sardor Usmonov' },
                  phone: { type: 'string', example: '+998901234567' },
                  img: { type: 'string', example: '/uploads/teacher-123.jpg' },
                },
              },
              students: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 5 },
                    username: { type: 'string', example: 'Alisher Valiyev' },
                    email: { type: 'string', example: 'alisher@example.com' },
                  },
                },
              },
            },
          },
        },
        total: { type: 'number', example: 25 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
      },
    },
  })
  async findAll(
    @Query('search') search?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    return this.groupService.findAll(search, page, limit);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id')
  @ApiOperation({
    summary: 'Bitta guruhni olish',
    description: 'ID orqali guruh ma\'lumotlarini olish (barcha rollar)',
  })
  @ApiParam({
    name: 'id',
    description: 'Guruh ID raqami',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Guruh ma\'lumotlari muvaffaqiyatli qaytarildi',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Frontend Development - A1' },
        lesson_days: { type: 'string', example: 'Dushanba,Chorshanba,Juma' },
        lesson_StartTime: { type: 'string', example: '09:00:00' },
        lesson_EndTime: { type: 'string', example: '11:00:00' },
        orientation: { type: 'string', example: 'Frontend Development' },
        teacher: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'Sardor Usmonov' },
            email: { type: 'string', example: 'sardor@example.com' },
            phone: { type: 'string', example: '+998901234567' },
            img: { type: 'string', example: '/uploads/teacher-123.jpg' },
          },
        },
        students: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 5 },
              username: { type: 'string', example: 'Alisher Valiyev' },
              email: { type: 'string', example: 'alisher@example.com' },
              phone: { type: 'string', example: '+998901234567' },
              img: { type: 'string', example: '/uploads/student-456.jpg' },
            },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Guruh topilmadi',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Post(':id/students')
  @ApiOperation({
    summary: 'Guruhga talaba qo\'shish',
    description: 'Mavjud guruhga talaba qo\'shish (Admin va Teacher)',
  })
  @ApiParam({
    name: 'id',
    description: 'Guruh ID raqami',
    example: 1,
  })
  @ApiResponse({
    status: 201,
    description: 'Talaba guruhga muvaffaqiyatli qo\'shildi',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Talaba guruhga qoshildi' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Guruh yoki talaba topilmadi',
  })
  @ApiBadRequestResponse({
    description: 'Talaba allaqachon guruhda',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bu talaba allaqachon guruhda' },
      },
    },
  })
  addStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddStudentToGroupDto,
  ) {
    return this.groupService.addStudent(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Delete(':groupId/students/:studentId')
  @ApiOperation({
    summary: 'Guruhdan talabani chiqarish',
    description: 'Guruhdan talabani chiqarish (arxivga o\'tkazish) (Admin va Teacher)',
  })
  @ApiParam({
    name: 'groupId',
    description: 'Guruh ID raqami',
    example: 1,
  })
  @ApiParam({
    name: 'studentId',
    description: 'Talaba ID raqami',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'Talaba guruhdan muvaffaqiyatli chiqarildi',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Talaba guruhdan chiqarildi' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Bog\'lanish topilmadi',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Boglanish topilmadi' },
      },
    },
  })
  removeStudent(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.groupService.removeStudent(groupId, studentId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({
    summary: 'Guruhni yangilash',
    description: 'Guruh ma\'lumotlarini yangilash (faqat Admin)',
  })
  @ApiParam({
    name: 'id',
    description: 'Guruh ID raqami',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Guruh muvaffaqiyatli yangilandi',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Frontend Development - A1 (yangilangan)' },
        lesson_days: { type: 'string', example: 'Dushanba,Chorshanba,Juma' },
        lesson_StartTime: { type: 'string', example: '09:00:00' },
        lesson_EndTime: { type: 'string', example: '11:00:00' },
        orientation: { type: 'string', example: 'Frontend Development' },
        teacher_id: { type: 'number', example: 1 },
        updatedAt: { type: 'string', example: '2024-01-16T10:00:00.000Z' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Guruh topilmadi',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGroupDto,
  ) {
    return this.groupService.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({
    summary: 'Guruhni o\'chirish',
    description: 'Guruhni butunlay o\'chirish (faqat Admin)',
  })
  @ApiParam({
    name: 'id',
    description: 'Guruh ID raqami',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Guruh muvaffaqiyatli o\'chirildi',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Guruh ochirildi' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Guruh topilmadi',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.remove(id);
  }
}