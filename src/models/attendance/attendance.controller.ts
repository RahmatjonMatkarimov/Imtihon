import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AttendanceService } from "./attendance.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/role.enum";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";

@Controller('groups')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Get(':groupId/attendance/today')
  @Roles(Role.Teacher, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getTodayAttendance(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return this.attendanceService.getTodayAttendance(groupId);
  }

  @Get(':groupId/attendance/:date')
  @Roles(Role.Teacher, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getAttendanceByDate(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('date') date: string, 
  ) {
    return this.attendanceService.getAttendanceByDate(groupId, date);
  }

  @Post(':groupId/attendance')
  @Roles(Role.Teacher, Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async saveAttendance(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() body: CreateAttendanceDto,
  ) {
    return this.attendanceService.saveAttendance(groupId, body.date, body.records);
  }
}