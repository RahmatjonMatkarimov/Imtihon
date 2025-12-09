import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Purchase } from "src/models/purchase/entities/purchase.entity";

@Table({ tableName: 'ShipmentMethod' })
export class ShipmentMethod extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @Column({ type: DataType.STRING, allowNull: false })
    label: string

    @Column({ type: DataType.DATE, allowNull: false })
    deliveryDate: Date

    @HasMany(() => Purchase)
    purchases: Purchase[];
}
