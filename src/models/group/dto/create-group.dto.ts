import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Matches } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'Guruh nomi',
    example: 'Frontend Development - A1',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Dars kunlari (vergul bilan ajratilgan)',
    example: 'Dushanba,Chorshanba,Juma',
  })
  @IsString()
  @IsNotEmpty()
  lesson_days: string;

  @ApiProperty({
    description: 'Dars boshlanish vaqti (HH:MM formatida)',
    example: '09:00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Vaqt formati noto\'g\'ri (HH:MM)',
  })
  lesson_StartTime: string;

  @ApiProperty({
    description: 'Dars tugash vaqti (HH:MM formatida)',
    example: '11:00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Vaqt formati noto\'g\'ri (HH:MM)',
  })
  lesson_EndTime: string;

  @ApiProperty({
    description: 'Yo\'nalish nomi',
    example: 'Frontend Development',
  })
  @IsString()
  @IsNotEmpty()
  orientation: string;

  @ApiProperty({
    description: 'O\'qituvchi ID raqami',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  teacher_id: number;
}