import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from 'src/models/group/entities/group.entity';
import { Student } from 'src/models/students/entities/student.entity';
import { Teacher } from 'src/models/teachers/entities/teacher.entity';
import { Op } from 'sequelize';
import { GroupStudent } from 'src/models/group/entities/group-student.entity';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel(Group) private groupModel: typeof Group,
        @InjectModel(Student) private studentModel: typeof Student,
        @InjectModel(Teacher) private teacherModel: typeof Teacher,
        @InjectModel(GroupStudent) private groupStudentModel: typeof GroupStudent,
    ) { }

    async statics() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        const totalStudents = await this.studentModel.count();
        const totalTeachers = await this.teacherModel.count();
        const totalGroups = await this.groupModel.count();

        const leftThisMonth = await this.groupStudentModel.count({
            where: {
                LeftAt: {
                    [Op.between]: [
                        new Date(`${year}-${month}-01`),
                        new Date(`${year}-${month}-31`)
                    ]
                }
            }
        });

        const months: any = [];

        for (let m = 1; m <= 12; m++) {
            const joined = await this.groupStudentModel.count({
                where: {
                    createdAt: {
                        [Op.between]: [
                            new Date(`${year}-${m}-01`),
                            new Date(`${year}-${m}-31`)
                        ]
                    }
                }
            });

            const left = await this.groupStudentModel.count({
                where: {
                    LeftAt: {
                        [Op.between]: [
                            new Date(`${year}-${m}-01`),
                            new Date(`${year}-${m}-31`)
                        ]
                    }
                }
            });

            months.push({ month: m, joined, left });
        }

        return {
            totalStudents,
            totalTeachers,
            totalGroups,
            leftThisMonth,
            months
        };
    }
}
