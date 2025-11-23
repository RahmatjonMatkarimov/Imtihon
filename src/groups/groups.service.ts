// src/groups/groups.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { Auth } from '../auth/entities/auth.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private readonly groupModel: typeof Group,
    @InjectModel(Auth) private readonly authModel: typeof Auth,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<{ message: string }> {
    const { title, teacher_id } = createGroupDto;

    const teacher = await this.authModel.findByPk(teacher_id);
    if (!teacher) {
      throw new NotFoundException(`Teacher ID ${teacher_id} topilmadi`);
    }

    if (teacher.role !== Role.Teacher && teacher.role !== Role.Admin) {
      throw new BadRequestException('Guruh yaratish faqat Teacher yoki Admin uchun ruxsat etilgan');
    }

    await this.groupModel.create({ title, teacher_id });
    return { message: 'Guruh muvaffaqiyatli yaratildi' };
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.findAll({
      include: [
        {
          model: Auth,
          as: 'teacher',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Auth,
          as: 'students',
          attributes: ['id', 'username', 'email'],
          through: { attributes: [] },
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupModel.findByPk(id, {
      include: [
        {
          model: Auth,
          as: 'teacher',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Auth,
          as: 'students',
          attributes: ['id', 'username', 'email'],
          through: { attributes: [] },
        },
      ],
    });

    if (!group) {
      throw new NotFoundException(`Guruh ID ${id} topilmadi`);
    }

    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<{ message: string }> {
    const group = await this.groupModel.findByPk(id);
    if (!group) {
      throw new NotFoundException(`Guruh ID ${id} topilmadi`);
    }

    if (updateGroupDto.teacher_id) {
      const newTeacher = await this.authModel.findByPk(updateGroupDto.teacher_id);
      if (!newTeacher) {
        throw new NotFoundException(`Yangi teacher ID ${updateGroupDto.teacher_id} topilmadi`);
      }
      if (newTeacher.role !== Role.Teacher && newTeacher.role !== Role.Admin) {
        throw new BadRequestException('Yangi teacher faqat Teacher yoki Admin bo‘lishi kerak');
      }
    }

    await group.update(updateGroupDto);
    return { message: 'Guruh muvaffaqiyatli yangilandi' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const group = await this.groupModel.findByPk(id);
    if (!group) {
      throw new NotFoundException(`Guruh ID ${id} topilmadi`);
    }

    await group.destroy();
    return { message: 'Guruh muvaffaqiyatli o‘chirildi' };
  }

  async addStudent(groupId: number, studentId: number): Promise<{ message: string }> {
    const group = await this.groupModel.findByPk(groupId);
    if (!group) throw new NotFoundException(`Guruh ID ${groupId} topilmadi`);

    const student = await this.authModel.findByPk(studentId);
    if (!student) throw new NotFoundException(`Talaba ID ${studentId} topilmadi`);

    if (student.role !== Role.Student) {
      throw new BadRequestException('Guruhga faqat "Student" roli qo‘shilishi mumkin');
    }

    const alreadyInGroup = await group.$has('students', student);
    if (alreadyInGroup) {
      throw new BadRequestException('Bu talaba allaqachon ushbu guruhda');
    }

    await group.$add('students', student);
    return { message: 'Talaba guruhga muvaffaqiyatli qo‘shildi' };
  }

  async removeStudent(groupId: number, studentId: number): Promise<{ message: string }> {
    const group = await this.groupModel.findByPk(groupId);
    if (!group) throw new NotFoundException(`Guruh ID ${groupId} topilmadi`);

    const student = await this.authModel.findByPk(studentId);
    if (!student) throw new NotFoundException(`Talaba ID ${studentId} topilmadi`);

    const isInGroup = await group.$has('students', student);
    if (!isInGroup) {
      throw new BadRequestException('Bu talaba guruhda emas');
    }

    await group.$remove('students', student);
    return { message: 'Talaba guruhdan muvaffaqiyatli chiqarildi' };
  }

  async getTeacherGroups(teacherId: number): Promise<Group[]> {
    const teacher = await this.authModel.findByPk(teacherId);
    if (!teacher) throw new NotFoundException(`Teacher ID ${teacherId} topilmadi`);

    return this.groupModel.findAll({
      where: { teacher_id: teacherId },
      include: [
        {
          model: Auth,
          as: 'students',
          attributes: ['id', 'username', 'email'],
          through: { attributes: [] },
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async getStudentGroups(studentId: number): Promise<Group[]> {
    const student = await this.authModel.findByPk(studentId, {
      include: [
        {
          model: Group,
          as: 'groups',
          include: [
            {
              model: Auth,
              as: 'teacher',
              attributes: ['id', 'username', 'email'],
            },
          ],
        },
      ],
    });

    if (!student) {
      throw new NotFoundException(`Talaba ID ${studentId} topilmadi`);
    }

    return student.groups || [];
  }
}