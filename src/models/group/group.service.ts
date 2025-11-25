import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { GroupStudent } from './entities/group-student.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { Student } from '../students/entities/student.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddStudentToGroupDto } from './dto/add-student.dto';
import { Status } from 'src/common/enums/status.enum';
import { Op } from 'sequelize';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private groupModel: typeof Group,
    @InjectModel(GroupStudent) private groupStudentModel: typeof GroupStudent,
    @InjectModel(Teacher) private teacherModel: typeof Teacher,
    @InjectModel(Student) private studentModel: typeof Student,
  ) { }

  async create(dto: CreateGroupDto) {
    const teacher = await this.teacherModel.findByPk(dto.teacher_id);
    if (!teacher) throw new NotFoundException('Ustoz topilmadi');

    return await this.groupModel.create({ ...dto });
  }

  async findAll(search?: string, page: number = 1, limit: number = 10,) {
    const offset = (page - 1) * limit;
    const whereCondition = search
      ? { name: { [Op.iLike]: `%${search}%` } }
      : {};
    const { rows, count } = await this.groupModel.findAndCountAll({
      where: whereCondition,
      include: [
        { model: Teacher, attributes: ['id', 'username', 'phone', 'img'] },
        {
          model: Student,
          through: {
            attributes: [],
            where: {
              LeftAt: null,
              status: Status.Active,
            },
          },
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return {
      data: rows,
      total: count,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const group = await this.groupModel.findByPk(id, {
      include: [
        { model: Teacher, attributes: ['id', 'username', 'email', 'phone', 'img'] },
        {
          model: Student,
          attributes: ['id', 'username', 'email', 'phone', 'img'],
          through: {
            attributes: [],
            where: {
              LeftAt: null,
              status: Status.Active
            },
          },
        },
      ],
    });

    if (!group) throw new NotFoundException('Guruh topilmadi');
    return group;
  }


  async addStudent(groupId: number, dto: AddStudentToGroupDto) {
    const [group, student] = await Promise.all([
      this.groupModel.findByPk(groupId),
      this.studentModel.findByPk(dto.student_id),
    ]);

    if (!group || !student) throw new NotFoundException('Guruh yoki talaba topilmadi');

    const exists = await this.groupStudentModel.findOne({
      where: { group_id: groupId, student_id: dto.student_id },
    });

    if (exists) throw new BadRequestException('Bu talaba allaqachon guruhda');

    await this.groupStudentModel.create({
      group_id: groupId,
      student_id: dto.student_id,
    });

    return { message: 'Talaba guruhga qoshildi' };
  }

  async removeStudent(groupId: number, studentId: number) {
    const studentInGroup = await this.groupStudentModel.findOne({
      where: { group_id: groupId, student_id: studentId },
    });

    if (!studentInGroup) {
      throw new NotFoundException('Boglanish topilmadi');
    }

    studentInGroup.LeftAt = new Date();
    studentInGroup.status = Status.Archive;
    await studentInGroup.save();

    return { message: 'Talaba guruhdan chiqarildi' };
  }


  async update(id: number, dto: Partial<CreateGroupDto>) {
    const group = await this.groupModel.findByPk(id);
    if (!group) throw new NotFoundException('Guruh topilmadi');
    return await group.update(dto);
  }

  async remove(id: number) {
    const group = await this.groupModel.findByPk(id);
    if (!group) throw new NotFoundException('Guruh topilmadi');
    await group.destroy();
    return { message: 'Guruh ochirildi' };
  }


}