import { Role } from 'src/common/enums/role.enum';
import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({ tableName: 'Users' })
export class Auth extends Model {

    @Column({
        allowNull: false
    })
    username: string;

    @Column({
        allowNull: false
    })
    email: string;

    @Column({
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.ENUM(...Object.values(Role)),
        allowNull: false,
        defaultValue: Role.User,
    })
    role: Role;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    isVerify: boolean;

    @Column({
        allowNull: true
    })
    otp: string;

    @Column({
        allowNull: true
    })
    otp_time: string;
}
