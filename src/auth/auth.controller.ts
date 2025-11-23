import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, registerDto, resetPasswordDto, verifyDto } from './dto/create-auth.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('ragister')
  register(@Body() register: registerDto) {
    return this.authService.register(register);
  }
  
  @Post('login')
  async login(@Body() data: loginDto, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.authService.login(data);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return {
      message: "Login muvaffaqiyatli bajarildi",
      user
    };
  }

  @Post('verify')
  verify(@Body() verify: verifyDto) {
    return this.authService.verify(verify);
  }

  @Post('resetPassword')
  reset_password(@Body() resetPassword: resetPasswordDto) {
    return this.authService.reset_password(resetPassword);
  }
}
