import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  student_id: number;

  @IsInt()
  group_id: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class PaymentResponseDto {
  id: number;
  amount: number;
  createdAt: Date;
  student: { username: string; phone: string };
  teacher: { username: string };
  group: { title: string };
}