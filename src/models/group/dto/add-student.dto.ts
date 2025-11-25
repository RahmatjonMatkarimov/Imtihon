import { IsInt } from 'class-validator';

export class AddStudentToGroupDto {
  @IsInt()
  student_id: number;
}