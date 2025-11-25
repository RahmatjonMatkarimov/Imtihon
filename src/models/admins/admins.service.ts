import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Role } from 'src/common/enums/role.enum';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from 'src/models/auth/entities/auth.entity';
import { Op } from 'sequelize';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private adminModel: typeof Admin,
    @InjectModel(Auth) private authModel: typeof Auth,
  ) { }

  async create(data: CreateAdminDto, img: string) {
    const { email, username, password, phone } = data;

    const existingUser = await this.adminModel.findOne({ where: { email } });
    const existingUserAuth = await this.authModel.findOne({ where: { email } });
    if (existingUser || existingUserAuth) {
      throw new BadRequestException("Foydalanuvchi allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = await this.adminModel.create({
      username,
      email,
      password: hashedPassword,
      role: Role.Admin,
      phone,
      img: img,
    });

    await this.authModel.create({
      email,
      username,
      password: hashedPassword,
      role: Role.Admin,
      user_id: newAdmin.dataValues.id,
    });


    return { message: "Royxatdan otdingiz" };
  }

  async findAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Admin[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;

    const whereCondition = search ? {
      [Op.or]: [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } },
      ],
    } : {}

    const { rows, count } = await this.adminModel.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      total: count,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin topilmadi`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto, img?: string) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin topilmadi`);
    }

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 12);
      await this.authModel.update(
        { password: updateAdminDto.password },
        { where: { user_id: id } },
      );
    }

    if (img !== undefined) {
      updateAdminDto['img'] = img;
    }

    await admin.update(updateAdminDto);
    return { message: "Admin yangilandi", admin };
  }

  async remove(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin topilmadi`);
    }

    await this.authModel.destroy({ where: { user_id: id } });
    await admin.destroy();

    return { message: "Admin o'chirildi" };
  }
}
