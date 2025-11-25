import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
} from 'sequelize-typescript';
import { Student } from '../../students/entities/student.entity';
import { Teacher } from '../../teachers/entities/teacher.entity';
import { Group } from '../../group/entities/group.entity';

@Table({ tableName: 'payments', timestamps: true })
export class Payment extends Model {
  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER, allowNull: false })
  student_id: number;

  @ForeignKey(() => Teacher)
  @Column({ type: DataType.INTEGER, allowNull: false })
  teacher_id: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: false })
  group_id: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  comment: string;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @BelongsTo(() => Group)
  group: Group;
}