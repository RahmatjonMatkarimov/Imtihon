import {
    Column,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';
import { GroupStudent } from './group-student.entity';
import { Status } from 'src/common/enums/status.enum';
import { Attendance } from 'src/models/attendance/entities/attendance.entity';

@Table({ tableName: 'groups', timestamps: true })
export class Group extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lesson_days: string;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    lesson_StartTime: string;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    lesson_EndTime: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    orientation: string;

    @ForeignKey(() => Teacher)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    teacher_id: number;

    @BelongsTo(() => Teacher)
    teacher: Teacher;

    @BelongsToMany(() => Student, () => GroupStudent)
    students: Student[];

    @HasMany(() => Attendance)
    attendances: Attendance[];
}