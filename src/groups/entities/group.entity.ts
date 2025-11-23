import { Column, Model, Table, DataType, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Auth } from "../../auth/entities/auth.entity";
import { GroupStudent } from "./group-student.entity";

@Table({ tableName: "group" })
export class Group extends Model {
    @Column({ allowNull: false })
    title: string;

    @Column({ allowNull: false })
    teacher_phone: string;

    @Column({ allowNull: false })
    teacher_Image: string;

    @Column({ allowNull: false })
    lesson_days: string;

    @Column({ allowNull: false })
    lesson_StartTime: string;

    @Column({ allowNull: false })
    lesson_EndTime: string;

    @Column({ allowNull: false })
    orientation: string;

    @Column({ allowNull: false })
    teacher_id: number;

    @BelongsTo(() => Auth, 'teacher_id')
    teacher: Auth;

    @BelongsToMany(() => Auth, () => GroupStudent)
    students: Auth[];
}