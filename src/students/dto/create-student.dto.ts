import { IsEmail, IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 500)
    password: string;

    @IsString()
    @IsOptional()
    phone: string;
}
