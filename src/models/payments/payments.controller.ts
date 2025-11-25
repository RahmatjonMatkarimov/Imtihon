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
import { CreatePaymentDto, PaymentResponseDto } from './dto/create-payment.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@UseGuards(AuthGuard, RolesGuard)
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'Yangi to‘lov qo‘shish' })
  @ApiResponse({ status: 201, description: 'To‘lov yaratildi', type: PaymentResponseDto })
  @ApiResponse({ status: 404, description: 'Talaba yoki guruh topilmadi' })
  @ApiResponse({ status: 400, description: 'Talaba guruh a’zosi emas' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'To‘lovlarni listlash' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'search', required: false, example: 'Ali' })
  @ApiQuery({ name: 'groupId', required: false, example: 1 })
  @ApiQuery({ name: 'studentId', required: false, example: 1 })
  @ApiResponse({ status: 200, description: 'To‘lovlar listi' })
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
  @ApiOperation({ summary: 'Talabaning to‘lovlari' })
  @ApiParam({ name: 'studentId', example: 1 })
  @ApiQuery({ name: 'groupId', required: false, example: 1 })
  @ApiResponse({ status: 200, description: 'Talabaning to‘lovlari' })
  getStudentPayments(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Query('groupId') groupId?: string,
  ) {
    return this.paymentsService.getStudentPayments(studentId, groupId ? +groupId : undefined);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Teacher)
  @ApiOperation({ summary: 'To‘lovni o‘chirish' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'To‘lov o‘chirildi' })
  @ApiResponse({ status: 404, description: 'To‘lov topilmadi' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentsService.remove(id);
  }
}
