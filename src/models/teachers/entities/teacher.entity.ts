import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Role } from '../../../common/enums/role.enum';
import { Group } from 'src/models/group/entities/group.entity';

@Table({ tableName: 'teachers', timestamps: true })
export class Teacher extends Model {
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
        type: DataType.ENUM(Role.Teacher),
        allowNull: false,
        defaultValue: Role.Teacher,
    })
    role: Role;

    @Column({ type: DataType.STRING, allowNull: true })
    phone: string;

    @Column({ type: DataType.STRING, allowNull: true })
    img: string;

    @HasMany(() => Group)
    groups: Group[];
}
