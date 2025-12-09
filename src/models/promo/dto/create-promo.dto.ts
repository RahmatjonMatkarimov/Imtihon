import { IsString, IsDateString, IsInt } from 'class-validator';

export class CreatePromoDto {
    @IsString()
    promoCode: string;
    @IsDateString()
    endDate: string;
    @IsInt()
    price: number;
}
