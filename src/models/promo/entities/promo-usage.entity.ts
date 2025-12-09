import { Column, DataType, Model, Table, ForeignKey } from "sequelize-typescript";
import { Promo } from "../../promo/entities/promo.entity";
import { User } from "../../users/entities/user.entity";
import { Product } from "src/models/products/entities/product.entity";

@Table({ tableName: "promo_usage" })
export class PromoUsage extends Model {
    @ForeignKey(() => Promo)
    @Column({ type: DataType.INTEGER, allowNull: false })
    promoId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    product_id: number;
}
