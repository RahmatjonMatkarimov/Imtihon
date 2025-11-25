// src/attendance/entities/attendance.entity.ts
import {
    Column,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
    DataType,
    CreatedAt,
} from 'sequelize-typescript'; import { AttendanceStatus } from 'src/common/enums/AttendanceStatus';
;
import { Group } from 'src/models/group/entities/group.entity';
import { Student } from 'src/models/students/entities/student.entity';

@Table({ tableName: 'attendances', timestamps: true })
export class Attendance extends Model {
    @ForeignKey(() => Group)
    @Column({ type: DataType.INTEGER, allowNull: false })
    group_id: number;

    @ForeignKey(() => Student)
    @Column({ type: DataType.INTEGER, allowNull: false })
    student_id: number;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    date: string;

    @Column({
        type: DataType.ENUM(...Object.values(AttendanceStatus)),
        allowNull: false,
        defaultValue: AttendanceStatus.ABSENT,
    })
    status: AttendanceStatus;

    @BelongsTo(() => Group)
    group: Group;

    @BelongsTo(() => Student)
    student: Student;
}