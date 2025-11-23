import { IsEmail, IsNotEmpty, MinLength, Length, } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    @Length(6, 50)
    password: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;
}

export class VerifyDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 6)
    otp: string;
}

export class ResetPasswordDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    @Length(6, 50)
    password: string;
}
