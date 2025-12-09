import { IsInt, IsNotEmpty, Max, Min, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'Comment matni', example: 'Mahsulot juda yaxshi' })
  @IsNotEmpty({ message: 'Comment text is required' })
  @IsString()
  comment: string;

  @ApiProperty({ description: 'Foydalanuvchi ID', example: 1 })
  @IsInt({ message: 'User ID must be an integer' })
  user_id: number;

  @ApiProperty({ description: 'Mahsulot ID', example: 1 })
  @IsInt({ message: 'Product ID must be an integer' })
  product_id: number;

  @ApiProperty({ description: 'Rating', example: 5, minimum: 1, maximum: 5 })
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot exceed 5' })
  rating: number;
}
