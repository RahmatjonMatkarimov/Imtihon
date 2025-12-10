import { Module } from '@nestjs/common';
import { ShipmentMethodService } from './shipment-method.service';
import { ShipmentMethodController } from './shipment-method.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShipmentMethod } from './entities/shipment-method.entity';
import { Purchase } from '../purchase/entities/purchase.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[SequelizeModule.forFeature([ShipmentMethod,Purchase]),AuthModule],
  controllers: [ShipmentMethodController],
  providers: [ShipmentMethodService],
})
export class ShipmentMethodModule {}
