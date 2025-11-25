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
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddStudentToGroupDto } from './dto/add-student.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.groupService.create(dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    return this.groupService.findAll(search, pageNumber, limitNumber);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Post(':id/students')
  addStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddStudentToGroupDto,
  ) {
    return this.groupService.addStudent(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  @Delete(':groupId/students/:studentId')
  removeStudent(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.groupService.removeStudent(groupId, studentId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateGroupDto>) {
    return this.groupService.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupService.remove(id);
  }
}
