import { Role } from 'src/common/enums/role.enum';
import { Column, Model, Table, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Group } from 'src/groups/entities/group.entity';
import { GroupStudent } from 'src/groups/entities/group-student.entity';

@Table({ tableName: 'Users' })
export class Auth extends Model {
    @Column({ allowNull: false })
    username: string;

    @Column({ allowNull: false, unique: true })
    email: string;

    @Column({ allowNull: false })
    password: string;

    @Column({
        type: DataType.ENUM(...Object.values(Role)),
        allowNull: false,
        defaultValue: Role.Student,
    })
    role: Role;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isVerify: boolean;

    @Column({ allowNull: true })
    otp: string;

    @Column({ allowNull: true })
    otp_time: string;

    @HasMany(() => Group, 'teacher_id')
    teachingGroups: Group[];

    @BelongsToMany(() => Group, () => GroupStudent)
    groups: Group[];
}