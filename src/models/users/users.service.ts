import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { User } from './entities/user.entity';
import { Auth } from 'src/models/auth/entities/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Auth) private authModel: typeof Auth,
  ) { }

  async create(data: CreateUserDto) {
    const { email, username, password } = data;

    const existingUser = await this.userModel.findOne({ where: { email } });
    const existingAuth = await this.authModel.findOne({ where: { email } });

    if (existingUser || existingAuth) {
      throw new BadRequestException('Foydalanuvchi allaqachon mavjud');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
      role: Role.User,
    });

    await this.authModel.create({
      email,
      username,
      password: hashedPassword,
      role: Role.User,
      user_id: newUser.id,
    });

    return { message: 'Royxatdan otdingiz', user: newUser };
  }

  async findAll(search?: string, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const where = search
      ? {
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      }
      : {};

    const { rows, count } = await this.userModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return { data: rows, total: count, page, limit };
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User topilmadi');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User topilmadi');

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
      await this.authModel.update({ password: updateUserDto.password }, { where: { user_id: id } });
    }

    await user.update(updateUserDto);
    return { message: 'User yangilandi', user };
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User topilmadi');

    await this.authModel.destroy({ where: { user_id: id } });
    await user.destroy();

    return { message: 'User o‘chirildi' };
  }
}
