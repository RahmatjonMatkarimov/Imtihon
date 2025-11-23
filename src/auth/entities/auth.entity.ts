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
        allowNull: false
    })
    role: string;

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
