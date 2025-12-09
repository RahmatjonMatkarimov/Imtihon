import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category nomi', example: 'Electronics' })
  @IsString()
  @IsNotEmpty()
  title: string;
}

