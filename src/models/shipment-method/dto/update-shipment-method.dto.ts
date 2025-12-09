import { PartialType } from '@nestjs/swagger';
import { CreateShipmentMethodDto } from './create-shipment-method.dto';

export class UpdateShipmentMethodDto extends PartialType(CreateShipmentMethodDto) {}
