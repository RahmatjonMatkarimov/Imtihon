import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({
        description: 'Foydalanuvchi email manzili',
        example: 'admin@example.com',
        format: 'email',
    })
    @IsEmail({}, { message: 'Email formati noto\'g\'ri' })
    @IsNotEmpty({ message: 'Email kiritilishi shart' })
    email: string;

    @ApiProperty({
        description: 'Foydalanuvchi paroli',
        example: 'SecurePass123!',
        minLength: 6,
        maxLength: 500,
    })
    @IsNotEmpty({ message: 'Parol kiritilishi shart' })
    @Length(6, 500, { message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' })
    password: string;
}