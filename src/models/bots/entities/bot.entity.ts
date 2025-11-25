import { Model, Column, Table, DataType } from "sequelize-typescript";

@Table({ tableName: 'bot' })
export class Bot extends Model {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    chatId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    message: string;
}
