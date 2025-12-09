import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShipmentMethodDto {
  @ApiProperty({ example: 'Express Delivery', description: 'Yuborish usuli nomi' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Express', description: 'Label yoki kod' })
  @IsString()
  label: string;

  @ApiProperty({ example: '2025-12-15', description: 'Yetkazib berish sanasi' })
  @IsDateString()
  deliveryDate: string;
}
