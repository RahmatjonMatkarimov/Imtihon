import { AuthGuard } from './../common/guards/auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ResetPasswordDto, VerifyDto } from './dto/create-auth.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('ragister')
  register(@Body() register: RegisterDto) {
    return this.authService.register(register);
  }

  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles(Role.User)
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('verify')
  verify(@Body() verify: VerifyDto) {
    return this.authService.verify(verify);
  }

  @Post('resetPassword')
  reset_password(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.reset_password(resetPassword);
  }
}
