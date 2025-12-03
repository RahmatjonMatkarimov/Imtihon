import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from 'src/models/auth/entities/auth.entity';
import { Op } from 'sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserModel: typeof User,
    @InjectModel(Auth) private authModel: typeof Auth,
  ) { }

  async create(data: CreateUserDto) {
    const { email, username, password } = data;

    const existingUser = await this.UserModel.findOne({ where: { email } });
    const existingUserAuth = await this.authModel.findOne({ where: { email } });
    if (existingUser || existingUserAuth) {
      throw new BadRequestException("Foydalanuvchi allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.UserModel.create({
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
      user_id: newUser.dataValues.id,
    });


    return { message: "Royxatdan otdingiz" };
  }

  async findAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;

    const whereCondition = search ? {
      [Op.or]: [
        { username: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } },
      ],
    } : {}

    const { rows, count } = await this.UserModel.findAndCountAll({
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
    const User = await this.UserModel.findByPk(id);
    if (!User) {
      throw new NotFoundException(`User topilmadi`);
    }
    return User;
  }

  async update(id: number, updateUserDto: UpdateUserDto, img?: string) {
    const User = await this.UserModel.findByPk(id);
    if (!User) {
      throw new NotFoundException(`User topilmadi`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
      await this.authModel.update(
        { password: updateUserDto.password },
        { where: { user_id: id } },
      );
    }

    await User.update(updateUserDto);
    return { message: "User yangilandi", User };
  }

  async remove(id: number) {
    const User = await this.UserModel.findByPk(id);
    if (!User) {
      throw new NotFoundException(`User topilmadi`);
    }

    await this.authModel.destroy({ where: { user_id: id } });
    await User.destroy();

    return { message: "User o'chirildi" };
  }
}
