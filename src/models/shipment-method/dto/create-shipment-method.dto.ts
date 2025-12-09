import { IsString, IsDateString } from 'class-validator';

export class CreateShipmentMethodDto {
  @IsString()
  title: string;

  @IsString()
  label: string;

  @IsDateString()
  deliveryDate: Date;
}
