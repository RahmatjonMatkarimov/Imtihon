import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikesProductDto {
  @ApiProperty({ description: 'Foydalanuvchi ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Mahsulot ID', example: 10 })
  @IsInt()
  @IsNotEmpty()
  product_id: number;
}
