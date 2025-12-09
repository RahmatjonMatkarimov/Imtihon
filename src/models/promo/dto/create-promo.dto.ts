import { IsString, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromoDto {
  @ApiProperty({ description: 'Promo kodi', example: 'DISCOUNT50' })
  @IsString()
  promoCode: string;

  @ApiProperty({ description: 'Promo tugash sanasi', example: '2025-12-31' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ description: 'Chegirma summasi', example: 5000 })
  @IsInt()
  price: number;
}
