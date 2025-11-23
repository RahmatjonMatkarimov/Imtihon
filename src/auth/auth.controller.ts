import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, registerDto, resetPasswordDto, verifyDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('ragister')
  register(@Body() register: registerDto) {
    return this.authService.register(register);
  }
  @Post('login')
  login(@Body() login: loginDto) {
    return this.authService.login(login);
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
