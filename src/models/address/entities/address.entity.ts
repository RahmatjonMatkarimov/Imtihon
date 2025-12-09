import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'address' })
export class Address extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, allowNull: false })
    address: string;

    @Column({ type: DataType.STRING, allowNull: false })
    phoneNumber: string;

    @Column({ type: DataType.STRING, allowNull: false })
    addressType: string;
}
