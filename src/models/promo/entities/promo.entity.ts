import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "promo" })
export class Promo extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    promoCode: string;

    @Column({ allowNull: false, type: DataType.DATE })
    endDate: Date;

    @Column({ allowNull: false, type: DataType.INTEGER })
    price: number;
}
