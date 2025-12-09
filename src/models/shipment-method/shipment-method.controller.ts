import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShipmentMethodService } from './shipment-method.service';
import { CreateShipmentMethodDto } from './dto/create-shipment-method.dto';
import { UpdateShipmentMethodDto } from './dto/update-shipment-method.dto';

@Controller('shipment-method')
export class ShipmentMethodController {
  constructor(private readonly shipmentMethodService: ShipmentMethodService) {}

  @Post()
  create(@Body() createShipmentMethodDto: CreateShipmentMethodDto) {
    return this.shipmentMethodService.create(createShipmentMethodDto);
  }

  @Get()
  findAll() {
    return this.shipmentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentMethodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipmentMethodDto: UpdateShipmentMethodDto) {
    return this.shipmentMethodService.update(+id, updateShipmentMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentMethodService.remove(+id);
  }
}
