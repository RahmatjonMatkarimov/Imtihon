import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'ShipmentMethod' })
export class ShipmentMethod extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @Column({ type: DataType.STRING, allowNull: false })
    label: string

    @Column({ type: DataType.DATE, allowNull: false })
    deliveryDate: Date
}
