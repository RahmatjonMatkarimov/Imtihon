import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductIdCountDto {
  @IsNumber()
  id: number;

  @IsNumber()
  count: number;
}

export class CreatePurchaseDto {
  @IsNumber()
  user_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductIdCountDto)
  product_ids: ProductIdCountDto[];

  @IsNumber()
  address_id: number;

  @IsNumber()
  shipmentMethod_id: number;

  @IsNumber()
  promo_id: number;

  card_number: string;
}
