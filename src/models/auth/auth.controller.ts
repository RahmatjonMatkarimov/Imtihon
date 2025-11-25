import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Tizimga kirish',
    description: 'Email va parol orqali tizimga kirish va JWT token olish',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Login ma\'lumotlari',
    examples: {
      admin: {
        summary: 'Admin akkaunt',
        value: {
          email: 'admin@example.com',
          password: 'admin123456',
        },
      },
      teacher: {
        summary: 'O\'qituvchi akkaunt',
        value: {
          email: 'teacher@example.com',
          password: 'teacher123456',
        },
      },
      student: {
        summary: 'Talaba akkaunt',
        value: {
          email: 'student@example.com',
          password: 'student123456',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Muvaffaqiyatli tizimga kirildi',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          description: 'JWT access token',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1, description: 'Foydalanuvchi ID' },
            email: {
              type: 'string',
              example: 'admin@example.com',
              description: 'Foydalanuvchi email',
            },
            username: {
              type: 'string',
              example: 'John Admin',
              description: 'Foydalanuvchi ismi',
            },
            role: {
              type: 'string',
              example: 'admin',
              enum: ['admin', 'teacher', 'student'],
              description: 'Foydalanuvchi roli',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Muvaffaqiyatli tizimga kirildi (alternative response)',
  })
  @ApiBadRequestResponse({
    description: 'Email yoki parol noto\'g\'ri',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Email yoki parol notogri' },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validatsiya xatosi',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: {
          type: 'array',
          example: [
            'Email formati noto\'g\'ri',
            'Parol kamida 6 ta belgidan iborat bo\'lishi kerak',
          ],
        },
        error: { type: 'string', example: 'Bad Request' },
      },
    },
  })
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}