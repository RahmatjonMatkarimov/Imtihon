import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Address nomi / title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'To‘liq manzil' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Telefon raqam', example: '+998901234567' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Address turi (HOME, OFFICE va hokazo)' })
  @IsString()
  @IsNotEmpty()
  addressType: string;
}
