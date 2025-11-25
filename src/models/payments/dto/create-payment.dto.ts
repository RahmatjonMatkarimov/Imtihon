import { IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'Talaba IDsi' })
  @IsInt()
  student_id: number;

  @ApiProperty({ example: 2, description: 'Guruh IDsi' })
  @IsInt()
  group_id: number;

  @ApiProperty({ example: 500000, description: 'To‘lov miqdori' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({ example: 'Avans to‘lovi', description: 'Izoh (ixtiyoriy)' })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class PaymentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 500000 })
  amount: number;

  @ApiProperty({ example: '2025-11-25T11:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: { username: 'Ali', phone: '+998901234567' } })
  student: { username: string; phone: string };

  @ApiProperty({ example: { username: 'Teacher1' } })
  teacher: { username: string };

  @ApiProperty({ example: { title: 'JavaScript 101' } })
  group: { title: string };
}
