
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from 'src/auth/entities/auth.entity';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Group } from 'src/group/entities/group.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Status } from 'src/common/enums/status.enum';
import { Op } from 'sequelize';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentModel: typeof Student,
    @InjectModel(Auth) private authModel: typeof Auth,
  ) { }

  async create(data: CreateStudentDto, img: string) {
    const { email, username, password, phone } = data;

    const existingUser = await this.studentModel.findOne({ where: { email } });
    const existingUserAuth = await this.authModel.findOne({ where: { email } });
    if (existingUser || existingUserAuth) {
      throw new BadRequestException("Foydalanuvchi allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newStudent = await this.studentModel.create({
      username,
      email,
      password: hashedPassword,
      role: Role.Student,
      phone,
      img: img,
    });

    await this.authModel.create({
      email,
      username,
      password: hashedPassword,
      role: Role.Student,
      user_id: newStudent.dataValues.id,
    });


    return { message: "Royxatdan otdingiz" };
  }

  async findAll(
    search?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const offset = (page - 1) * limit;

    const whereCondition = search
      ? {
        [Op.or]: [
          { username: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { phone: { [Op.iLike]: `%${search}%` } },
        ],
      }
      : {};

    const { rows, count } = await this.studentModel.findAndCountAll({
      where: { ...whereCondition, status: Status.Active },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Group,
          through: { attributes: ['joined_at'] },
          include: [
            { model: Teacher, attributes: ['id', 'username', 'phone', 'img'] },
          ],
        },
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      hasNext: page * limit < count,
      hasPrev: page > 1,
    };
  }


  async findOne(id: number) {
    const student = await this.studentModel.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Group,
          through: { attributes: ['joined_at'] },
          include: [{ model: Teacher, attributes: ['id', 'username', 'phone', 'img'] }],
        },
      ],
    });

    if (!student) throw new NotFoundException('Talaba topilmadi');
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto, img?: string) {
    const Student = await this.studentModel.findByPk(id);
    if (!Student) {
      throw new NotFoundException(`Student topilmadi`);
    }

    if (updateStudentDto.password) {
      updateStudentDto.password = await bcrypt.hash(updateStudentDto.password, 12);
      await this.authModel.update(
        { password: updateStudentDto.password },
        { where: { user_id: id } },
      );
    }

    if (img !== undefined) {
      updateStudentDto['img'] = img;
    }

    await Student.update(updateStudentDto);
    return { message: "Student yangilandi", Student };
  }

  async remove(id: number) {
    const Student = await this.studentModel.findByPk(id);
    if (!Student) {
      throw new NotFoundException(`Student topilmadi`);
    }

    await this.authModel.destroy({ where: { user_id: id } });
    await Student.destroy();

    return { message: "Student o'chirildi" };
  }
}
