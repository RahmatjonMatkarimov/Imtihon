import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { PromoUsage } from "./promo-usage.entity";

@Table({ tableName: "promo" })
export class Promo extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    promoCode: string;

    @Column({ allowNull: false, type: DataType.DATE })
    endDate: Date;

    @Column({ allowNull: false, type: DataType.INTEGER })
    price: number;

    @HasMany(() => PromoUsage)
    usages: PromoUsage[];
}
