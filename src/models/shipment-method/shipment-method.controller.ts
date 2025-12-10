import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ShipmentMethodService } from './shipment-method.service';
import { CreateShipmentMethodDto } from './dto/create-shipment-method.dto';
import { UpdateShipmentMethodDto } from './dto/update-shipment-method.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Shipment Method')
@Controller('shipment-method')
export class ShipmentMethodController {
  constructor(private readonly shipmentMethodService: ShipmentMethodService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi yuborish usulini yaratish' })
  @ApiBody({ type: CreateShipmentMethodDto })
  @ApiResponse({ status: 201, description: 'Yuborish usuli yaratildi' })
  create(@Body() createShipmentMethodDto: CreateShipmentMethodDto) {
    return this.shipmentMethodService.create(createShipmentMethodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha yuborish usullarini olish' })
  findAll() {
    return this.shipmentMethodService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta yuborish usulini olish' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentMethodService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Yuborish usulini yangilash' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShipmentMethodDto: UpdateShipmentMethodDto) {
    return this.shipmentMethodService.update(id, updateShipmentMethodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Yuborish usulini o‘chirish' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shipmentMethodService.remove(id);
  }
}
