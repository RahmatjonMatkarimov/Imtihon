import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "products" })
export class Product extends Model {
    @Column({
        allowNull: false
    })
    title: string

    @Column({
        allowNull: false
    })
    prise: number
}
