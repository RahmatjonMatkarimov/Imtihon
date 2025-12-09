import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateHeroDto {
  @ApiProperty({ description: 'Hero nomi', example: 'Superman' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Hero tavsifi', example: 'Metropolis qahramoni', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
