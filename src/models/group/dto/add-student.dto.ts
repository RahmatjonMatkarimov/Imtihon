import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AddStudentToGroupDto {
  @ApiProperty({
    description: 'Talaba ID raqami',
    example: 5,
  })
  @IsInt()
  @IsNotEmpty()
  student_id: number;
}