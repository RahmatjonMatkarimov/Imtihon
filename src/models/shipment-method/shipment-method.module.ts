import { Module } from '@nestjs/common';
import { ShipmentMethodService } from './shipment-method.service';
import { ShipmentMethodController } from './shipment-method.controller';

@Module({
  controllers: [ShipmentMethodController],
  providers: [ShipmentMethodService],
})
export class ShipmentMethodModule {}
