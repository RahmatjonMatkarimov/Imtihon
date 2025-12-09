// shopping-cart.entity.ts
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "src/models/products/entities/product.entity";
import { User } from "src/models/users/entities/user.entity";

@Table({ tableName: 'cart' })
export class ShoppingCart extends Model {
    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.INTEGER })
    user_id: number;

    @ForeignKey(() => Product)
    @Column({ allowNull: false, type: DataType.INTEGER, unique: true })
    product_id: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Product)
    product: Product;
}
