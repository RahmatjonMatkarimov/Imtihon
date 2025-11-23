import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'Users' })
export class Auth extends Model {
    @Column
    username: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    role: string;

    @Column
    isVerify: boolean;

    @Column
    otp: string;

    @Column
    otp_time: string;
}
