import { IsArray, IsNumber, ValidateNested, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductIdCountDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  count: number;
}

export class CreatePurchaseDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ type: [ProductIdCountDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductIdCountDto)
  product_ids: ProductIdCountDto[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  address_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  shipmentMethod_id: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  promo_id?: number;

  @ApiProperty({ example: '1234-5678-9012-3456', required: false })
  @IsOptional()
  @IsString()
  card_number?: string;
}
