import { IsEmail, IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Ustoz Ali', description: 'O‘qituvchi ismi' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'ali@example.com', description: 'O‘qituvchi emaili' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'O‘qituvchi paroli', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @Length(6, 500)
  password: string;

  @ApiPropertyOptional({ example: '+998901234567', description: 'O‘qituvchi telefoni (ixtiyoriy)' })
  @IsString()
  @IsOptional()
  phone: string;
}
