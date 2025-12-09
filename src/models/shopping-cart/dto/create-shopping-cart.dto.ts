import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingCartDto {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 10, description: 'Mahsulot ID' })
  @IsInt()
  product_id: number;
}
