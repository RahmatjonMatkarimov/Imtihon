import { IsString, IsNotEmpty, IsNumber, IsOptional, IsInt, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Mahsulot nomi', example: 'Smartphone XYZ' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Mahsulot narxi', example: 1500 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Mahsulot tavsifi', example: 'Yangi model, ajoyib xususiyatlar' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Mahsulot soni', example: 50 })
  @IsInt()
  count: number;

  @ApiProperty({ description: 'Mahsulot kafolat muddati', example: '2026-12-10' })
  @IsDate()
  @IsOptional()
  guaranteed?: Date;

  @ApiProperty({ description: 'Qo‘shimcha atributlar', example: { color: 'red', size: 'L' } })
  @IsOptional()
  attributes?: any;

  @ApiProperty({ description: 'Owner (Admin) ID', example: 1 })
  @IsInt()
  owner_id: number;

  @ApiProperty({ description: 'Category ID', example: 2 })
  @IsInt()
  category_id: number;
}
