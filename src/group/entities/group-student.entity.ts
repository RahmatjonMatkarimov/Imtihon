import {
    Column,
    Model,
    Table,
    ForeignKey,
    CreatedAt,
    BelongsTo,
    DataType,
} from 'sequelize-typescript';
import { Group } from './group.entity';
import { Student } from '../../students/entities/student.entity';
import { Status } from 'src/common/enums/status.enum';

@Table({ tableName: 'group_students', timestamps: true })
export class GroupStudent extends Model {
    @ForeignKey(() => Group)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    group_id: number;

    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
    })
    student_id: number;


    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: null
    })
    LeftAt: Date;

    @Column({
        type: DataType.ENUM(...Object.values(Status)),
        allowNull: false,
        defaultValue: Status.Active,
    })
    status: Status;

    @BelongsTo(() => Group)
    group: Group;

    @BelongsTo(() => Student)
    student: Student;
}