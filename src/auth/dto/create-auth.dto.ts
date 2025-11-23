export class registerDto {
    username: string;
    email: string;
    password: string;
}

export class loginDto {
    email: string;
    password: string;
}

export class verifyDto {
    email: string;
    otp: string;
}

export class resetPasswordDto {
    email: string;
    password: string;
}
