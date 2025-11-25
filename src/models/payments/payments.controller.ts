// src/payments/payments.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post()
  @Roles(Role.Admin, Role.Teacher)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Teacher)
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('search') search?: string,
    @Query('groupId') groupId?: string,
    @Query('studentId') studentId?: string,
  ) {
    return this.paymentsService.findAll({
      page: +page,
      limit: +limit,
      search,
      groupId: groupId ? +groupId : undefined,
      studentId: studentId ? +studentId : undefined,
    });
  }


  @Get('student/:studentId')
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  getStudentPayments(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Query('groupId') groupId?: string,
  ) {
    return this.paymentsService.getStudentPayments(studentId, groupId ? +groupId : undefined);
  }


  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.remove(id);
  }
}