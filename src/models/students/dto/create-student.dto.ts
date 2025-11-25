import { IsEmail, IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ example: 'Ali', description: 'Talaba ismi' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Talaba emaili' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Talaba paroli', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @Length(6, 500)
  password: string;

  @ApiPropertyOptional({ example: '+998901234567', description: 'Talaba telefoni (ixtiyoriy)' })
  @IsString()
  @IsOptional()
  phone: string;
}
