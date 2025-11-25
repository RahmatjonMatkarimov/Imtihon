import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from 'src/models/auth/entities/auth.entity';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Group } from 'src/models/group/entities/group.entity';
import { Student } from 'src/models/students/entities/student.entity';
import { Op } from 'sequelize';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher) private teacherModel: typeof Teacher,
    @InjectModel(Auth) private authModel: typeof Auth,
  ) { }

  async create(data: CreateTeacherDto, img: string) {
    const { email, username, password, phone } = data;

    const existingUser = await this.teacherModel.findOne({ where: { email } });
    const existingUserAuth = await this.authModel.findOne({ where: { email } });
    if (existingUser || existingUserAuth) {
      throw new BadRequestException("Foydalanuvchi allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newTeacher = await this.teacherModel.create({
      username,
      email,
      password: hashedPassword,
      role: Role.Teacher,
      phone,
      img: img,
    });

    await this.authModel.create({
      email,
      username,
      password: hashedPassword,
      role: Role.Teacher,
      user_id: newTeacher.dataValues.id,
    });


    return { message: "Royxatdan otdingiz" };
  }

  async findAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Teacher[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;

    const whereCondition = search
      ? {
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { phone: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
        ],
      }
      : {};

    const { rows, count } = await this.teacherModel.findAndCountAll({
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
    const teacher = await this.teacherModel.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Group,
          include: [{ model: Student, attributes: ['id', 'username', 'phone', 'img'] }],
        },
      ],
    });

    if (!teacher) throw new NotFoundException('Ustoz topilmadi');
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto, img?: string) {
    const Teacher = await this.teacherModel.findByPk(id);
    if (!Teacher) {
      throw new NotFoundException(`Teacher topilmadi`);
    }

    if (updateTeacherDto.password) {
      updateTeacherDto.password = await bcrypt.hash(updateTeacherDto.password, 12);
      await this.authModel.update(
        { password: updateTeacherDto.password },
        { where: { user_id: id } },
      );
    }

    if (img !== undefined) {
      updateTeacherDto['img'] = img;
    }

    await Teacher.update(updateTeacherDto);
    return { message: "Teacher yangilandi", Teacher };
  }

  async remove(id: number) {
    const Teacher = await this.teacherModel.findByPk(id);
    if (!Teacher) {
      throw new NotFoundException(`Teacher topilmadi`);
    }

    await this.authModel.destroy({ where: { user_id: id } });
    await Teacher.destroy();

    return { message: "Teacher o'chirildi" };
  }
}
