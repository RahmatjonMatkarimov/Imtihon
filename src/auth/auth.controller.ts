import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register() {
    return this.authService.register();
  }
  login() {
    return this.authService.login();
  }
  verify() {
    return this.authService.verify();
  }
  reset_password() {
    return this.authService.reset_password();
  }
}
