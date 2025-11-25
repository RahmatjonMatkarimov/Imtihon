import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherDto } from './create-teacher.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Rasm fayli (jpg, jpeg, png)' })
  img?: string;
}
