// src/groups/dto/create-group.dto.ts
import { IsNotEmpty, IsString, IsInt, IsUrl } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  teacher_phone: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  teacher_Image: string;

  @IsNotEmpty()
  @IsString()
  lesson_days: string;

  @IsNotEmpty()
  @IsString()
  lesson_StartTime: string;

  @IsNotEmpty()
  @IsString()
  lesson_EndTime: string;

  @IsNotEmpty()
  @IsString()
  orientation: string;

  @IsNotEmpty()
  @IsInt()
  teacher_id: number;
}
