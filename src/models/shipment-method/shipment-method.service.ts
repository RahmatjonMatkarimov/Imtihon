import { Injectable } from '@nestjs/common';
import { CreateShipmentMethodDto } from './dto/create-shipment-method.dto';
import { UpdateShipmentMethodDto } from './dto/update-shipment-method.dto';

@Injectable()
export class ShipmentMethodService {
  create(createShipmentMethodDto: CreateShipmentMethodDto) {
    return 'This action adds a new shipmentMethod';
  }

  findAll() {
    return `This action returns all shipmentMethod`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shipmentMethod`;
  }

  update(id: number, updateShipmentMethodDto: UpdateShipmentMethodDto) {
    return `This action updates a #${id} shipmentMethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipmentMethod`;
  }
}
