import { IsArray, IsInt, IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';

export class CreatePurchaseDto {
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @IsInt()
    @IsNotEmpty()
    address_id: number;

    @IsInt()
    @IsNotEmpty()
    shipmentMethod_id: number;

    @IsInt()
    @IsNotEmpty()
    promo_id: number;

    @IsString()
    @IsNotEmpty()
    card_number: string;

    @IsArray()
    @ArrayMinSize(1) 
    product_ids: number[];
}
