import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AttendanceStatus } from 'src/common/enums/AttendanceStatus';
import { Status } from 'src/common/enums/status.enum';
import { Student } from 'src/models/students/entities/student.entity';
import { Attendance } from './entities/attendance.entity';
import { GroupStudent } from 'src/models/group/entities/group-student.entity';
import { Sequelize } from 'sequelize-typescript'; 

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance) private attendanceModel: typeof Attendance,
    @InjectModel(GroupStudent) private groupStudentModel: typeof GroupStudent,
    @InjectModel(Student) private studentModel: typeof Student,
    private sequelize: Sequelize, 
  ) {}

  async getTodayAttendance(groupId: number) {
    const today = new Date().toISOString().split('T')[0];
    return this.getAttendanceByDate(groupId, today);
  }

  async getAttendanceByDate(groupId: number, date: string) {
    const groupExists = await this.groupStudentModel.count({
      where: { group_id: groupId },
    });
    if (groupExists === 0) {
      throw new NotFoundException('Guruh topilmadi yoki bo‘sh');
    }

    const activeStudents = await this.groupStudentModel.findAll({
      where: { group_id: groupId, LeftAt: null, status: Status.Active },
      include: [
        {
          model: Student,
          attributes: ['id', 'username', 'phone'],
        },
      ],
      order: [[Student, 'username', 'ASC']], 
    });

    const studentIds = activeStudents.map((gs) => gs.student_id);

    const records = await this.attendanceModel.findAll({
      where: {
        group_id: groupId,
        date,
        student_id: studentIds.length > 0 ? studentIds : [0], 
      },
      attributes: ['student_id', 'status'],
    });

    const result = activeStudents.map((gs) => {
      const student = gs.student!;
      const record = records.find((r) => r.student_id === student.id);

      return {
        student_id: student.id,
        username: student.username,
        phone: student.phone || null,
        status: record?.status || AttendanceStatus.ABSENT,
      };
    });

    return {
      group_id: groupId,
      date,
      students: result,
    };
  }

  async saveAttendance(
    groupId: number,
    date: string,
    records: { student_id: number; status: AttendanceStatus }[],
  ) {
    if (!records || records.length === 0) {
      throw new BadRequestException('Hech qanday maʼlumot yuborilmadi');
    }

    const transaction = await this.sequelize.transaction();

    try {
      const upserts = records.map((rec) =>
        this.attendanceModel.upsert(
          {
            group_id: groupId,
            student_id: rec.student_id,
            date,
            status: rec.status,
          },
          { transaction },
        ),
      );

      await Promise.all(upserts);
      await transaction.commit();

      return {
        message: 'Davomat muvaffaqiyatli saqlandi',
        date,
        saved_count: records.length,
      };
    } catch (error) {
      await transaction.rollback();
      console.error('Davomat saqlashda xato:', error);
      throw new BadRequestException('Davomatni saqlashda xatolik yuz berdi');
    }
  }
}