import { Module } from '@nestjs/common';
import { ShipmentMethodService } from './shipment-method.service';
import { ShipmentMethodController } from './shipment-method.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShipmentMethod } from './entities/shipment-method.entity';

@Module({
  imports:[SequelizeModule.forFeature([ShipmentMethod])],
  controllers: [ShipmentMethodController],
  providers: [ShipmentMethodService],
})
export class ShipmentMethodModule {}
