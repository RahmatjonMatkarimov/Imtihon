import { IsEmail, IsNotEmpty, MinLength, Length, } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 500)
    password: string;
}
