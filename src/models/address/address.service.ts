import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address) private readonly addressModel: typeof Address) { }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = await this.addressModel.create({ ...createAddressDto });
    return address;
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.findAll();
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressModel.findByPk(id);
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id);
    return address.update(updateAddressDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const address = await this.findOne(id);
    await address.destroy();
    return { message: `Address with id ${id} has been deleted` };
  }
}
