import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/role.enum";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('attendance')
@ApiBearerAuth()
@Controller('groups')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Get(':groupId/attendance/today')
  @Roles(Role.Teacher, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Bugungi davomatni olish',
    description: 'Guruh uchun bugungi kun davomatini ko\'rish (faqat Teacher va Admin)',
  })
  @ApiParam({
    name: 'groupId',
    description: 'Guruh ID raqami',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Bugungi davomat muvaffaqiyatli qaytarildi',
    schema: {
      type: 'object',
      properties: {
        group_id: { type: 'number', example: 1 },
        date: { type: 'string', example: '2024-01-15' },
        students: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              student_id: { type: 'number', example: 1 },
              username: { type: 'string', example: 'Alisher Valiyev' },
              phone: { type: 'string', example: '+998901234567' },
              status: { type: 'string', example: 'PRESENT', enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] },
            },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Guruh topilmadi yoki bo\'sh',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Guruh topilmadi yoki bo\'sh' },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  async getTodayAttendance(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return this.attendanceService.getTodayAttendance(groupId);
  }

  @Get(':groupId/attendance/:date')
  @Roles(Role.Teacher, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Muayyan kun davomatini olish',
    description: 'Guruh uchun ko\'rsatilgan sanadagi davomatni ko\'rish (faqat Teacher va Admin)',
  })
  @ApiParam({
    name: 'groupId',
    description: 'Guruh ID raqami',
    example: 1,
  })
  @ApiParam({
    name: 'date',
    description: 'Davomat sanasi (YYYY-MM-DD formatida)',
    example: '2024-01-15',
  })
  @ApiResponse({
    status: 200,
    description: 'Ko\'rsatilgan kun davomat muvaffaqiyatli qaytarildi',
    schema: {
      type: 'object',
      properties: {
        group_id: { type: 'number', example: 1 },
        date: { type: 'string', example: '2024-01-15' },
        students: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              student_id: { type: 'number', example: 1 },
              username: { type: 'string', example: 'Alisher Valiyev' },
              phone: { type: 'string', example: '+998901234567' },
              status: { type: 'string', example: 'PRESENT', enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] },
            },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Guruh topilmadi yoki bo\'sh',
  })
  async getAttendanceByDate(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('date') date: string,
  ) {
    return this.attendanceService.getAttendanceByDate(groupId, date);
  }

  @Post(':groupId/attendance')
  @Roles(Role.Teacher, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Davomatni saqlash',
    description: 'Guruh uchun davomat ma\'lumotlarini saqlash yoki yangilash (faqat Teacher va Admin)',
  })
  @ApiParam({
    name: 'groupId',
    description: 'Guruh ID raqami',
    example: 1,
  })
  @ApiResponse({
    status: 201,
    description: 'Davomat muvaffaqiyatli saqlandi',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Davomat muvaffaqiyatli saqlandi' },
        date: { type: 'string', example: '2024-01-15' },
        saved_count: { type: 'number', example: 15 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Noto\'g\'ri ma\'lumot',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          oneOf: [
            { type: 'string', example: 'Hech qanday maʼlumot yuborilmadi' },
            { type: 'string', example: 'Davomatni saqlashda xatolik yuz berdi' },
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  async saveAttendance(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() body: CreateAttendanceDto,
  ) {
    return this.attendanceService.saveAttendance(groupId, body.date, body.records);
  }
}