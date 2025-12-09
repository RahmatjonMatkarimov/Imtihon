import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShipmentMethod } from './entities/shipment-method.entity';
import { CreateShipmentMethodDto } from './dto/create-shipment-method.dto';
import { UpdateShipmentMethodDto } from './dto/update-shipment-method.dto';

@Injectable()
export class ShipmentMethodService {
  constructor(
    @InjectModel(ShipmentMethod)
    private readonly shipmentMethodModel: typeof ShipmentMethod,
  ) { }

  async create(createShipmentMethodDto: CreateShipmentMethodDto) {
    const shipmentMethod = await this.shipmentMethodModel.create({ ...createShipmentMethodDto });
    return shipmentMethod;
  }

  async findAll() {
    return this.shipmentMethodModel.findAll();
  }

  async findOne(id: number) {
    const shipmentMethod = await this.shipmentMethodModel.findByPk(id);
    if (!shipmentMethod) {
      throw new NotFoundException(`ShipmentMethod not found`);
    }
    return shipmentMethod;
  }

  async update(id: number, updateShipmentMethodDto: UpdateShipmentMethodDto) {
    const shipmentMethod = await this.findOne(id);
    return shipmentMethod.update(updateShipmentMethodDto);
  }

  async remove(id: number) {
    const shipmentMethod = await this.findOne(id);
    await shipmentMethod.destroy();
    return { message: `ShipmentMethod has been deleted` };
  }
}
