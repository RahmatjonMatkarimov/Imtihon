import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  teacher_id: number;

  @IsString()
  @IsNotEmpty()
  lesson_days: string;

  @IsString()
  @IsNotEmpty()
  lesson_StartTime: string;

  @IsString()
  @IsNotEmpty()
  lesson_EndTime: string;

  @IsString()
  @IsNotEmpty()
  orientation: string;
}