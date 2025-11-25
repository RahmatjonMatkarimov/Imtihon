import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { Student } from '../students/entities/student.entity';
import { Group } from '../group/entities/group.entity';
import { Teacher } from '../teachers/entities/teacher.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Op } from 'sequelize';
import { GroupStudent } from '../group/entities/group-student.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private paymentModel: typeof Payment,
    @InjectModel(Student) private studentModel: typeof Student,
    @InjectModel(Group) private groupModel: typeof Group,
    @InjectModel(GroupStudent) private groupStudentModel: typeof GroupStudent,
  ) { }

  async create(dto: CreatePaymentDto) {
    const [student, group] = await Promise.all([
      this.studentModel.findByPk(dto.student_id),
      this.groupModel.findByPk(dto.group_id, {
        include: [{ model: Teacher }],
      }),
    ]);

    if (!student) throw new NotFoundException('Talaba topilmadi');
    if (!group) throw new NotFoundException('Guruh topilmadi');

    const inGroup = await this.groupStudentModel.findOne({
      where: {
        student_id: dto.student_id,
        group_id: dto.group_id,
        status: 'active',
        LeftAt: null,
      },
    });

    if (!inGroup) {
      throw new BadRequestException('Bu talaba ushbu guruh a’zosi emas');
    }

    const payment = await this.paymentModel.create({
      student_id: dto.student_id,
      group_id: dto.group_id,
      teacher_id: group.teacher_id,
      amount: dto.amount,
      comment: dto.comment,
    });

    return await this.paymentModel.findByPk(payment.id, {
      include: [
        { model: Student, attributes: ['username', 'phone'] },
        { model: Teacher, attributes: ['username'] },
        { model: Group, attributes: ['title'] },
      ],
    });
  }


async findAll({
  page = 1,
  limit = 20,
  search,
  groupId,
  studentId,
}: {
  page?: number;
  limit?: number;
  search?: string;
  groupId?: number;
  studentId?: number;
}) {
  const offset = (page - 1) * limit;
  const where: any = {};

  if (search) {
    where[Op.or] = [
      { '$student.username$': { [Op.iLike]: `%${search}%` } },
      { '$group.title$': { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (groupId) where.group_id = groupId;
  if (studentId) where.student_id = studentId;

  const { rows, count } = await this.paymentModel.findAndCountAll({
    where,
    include: [
      { model: Student, attributes: ['id', 'username', 'phone'] },
      { model: Teacher, attributes: ['username'] },
      { model: Group, attributes: ['title'] },
    ],
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });

  return { data: rows, total: count, page, limit };
}


  async getStudentPayments(studentId: number, groupId?: number) {
    const where: any = { student_id: studentId };
    if (groupId) where.group_id = groupId;

    return await this.paymentModel.findAll({
      where,
      include: [
        { model: Group, attributes: ['title'] },
        { model: Teacher, attributes: ['username'] },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async remove(id: number) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) throw new NotFoundException('To‘lov topilmadi');
    await payment.destroy();
    return { message: 'To‘lov o‘chirildi' };
  }
}