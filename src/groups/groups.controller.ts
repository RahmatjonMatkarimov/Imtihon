import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('groups')
@UseGuards(AuthGuard, RolesGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Post(':id/add-student')
  @Roles(Role.Admin)
  async addStudent(
    @Param('id', ParseIntPipe) groupId: number,
    @Body('studentId', ParseIntPipe) studentId: number,
  ) {
    if (studentId <= 0 || groupId <= 0) {
      throw new BadRequestException('ID musbat son bo‘lishi kerak');
    }
    return this.groupsService.addStudent(groupId, studentId);
  }

  @Post(':id/remove-student')
  @Roles(Role.Admin)
  async removeStudent(
    @Param('id', ParseIntPipe) groupId: number,
    @Body('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.groupsService.removeStudent(groupId, studentId);
  }

  @Roles(Role.Admin, Role.Teacher)
  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.remove(id);
  }

  @Get('teacher/:teacherId')
  @Roles(Role.Admin, Role.Teacher)
  async getTeacherGroups(@Param('teacherId', ParseIntPipe) teacherId: number) {
    return this.groupsService.getTeacherGroups(teacherId);
  }

  @Get('student/:studentId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  async getStudentGroups(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.groupsService.getStudentGroups(studentId);
  }
}