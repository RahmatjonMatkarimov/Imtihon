import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'Mahsulot rasmlari',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  @IsOptional()
  files?: any[];
}