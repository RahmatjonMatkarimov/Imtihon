import { IsEmail, IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Admin username',
        example: 'john_admin',
        minLength: 1,
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Admin email address',
        example: 'admin@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Admin password',
        example: 'SecurePass123!',
        minLength: 6,
        maxLength: 500,
    })
    @IsString()
    @IsNotEmpty()
    @Length(6, 500)
    password: string;

}