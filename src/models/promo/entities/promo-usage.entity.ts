import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Promo } from "./promo.entity";
import { User } from "../../users/entities/user.entity";
import { Product } from "src/models/products/entities/product.entity";
import { Purchase } from "src/models/purchase/entities/purchase.entity";

@Table({ tableName: "promo_usage" })
export class PromoUsage extends Model {
    @ForeignKey(() => Promo)
    @Column({ type: DataType.INTEGER, allowNull: false })
    promoId: number;

    @BelongsTo(() => Promo)
    promo: Promo;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    product_id: number;

    @BelongsTo(() => Product)
    product: Product;

    @HasMany(() => Purchase)
    purchases: Purchase[];
}
