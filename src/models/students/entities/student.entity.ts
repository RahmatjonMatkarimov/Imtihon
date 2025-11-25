import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { Role } from '../../../common/enums/role.enum';
import { Group } from 'src/models/group/entities/group.entity';
import { GroupStudent } from 'src/models/group/entities/group-student.entity';

@Table({ tableName: 'students', timestamps: true })
export class Student extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM(Role.Student),
        allowNull: false,
        defaultValue: Role.Student,
    })
    role: Role;

    @Column({ type: DataType.STRING, allowNull: true })
    phone: string;

    @Column({ type: DataType.STRING, allowNull: true })
    img: string;

    @BelongsToMany(() => Group, () => GroupStudent)
    groups: Group[];
}
