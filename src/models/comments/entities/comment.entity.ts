import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Product } from "src/models/products/entities/product.entity";
import { User } from "src/models/users/entities/user.entity";

@Table({ tableName: 'comments' })
export class Comment extends Model {
    @Column({ allowNull: false, type: DataType.STRING })
    comment: string;

    @ForeignKey(() => User)
    @Column({ allowNull: false, type: DataType.INTEGER })
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Product)
    @Column({ allowNull: false, type: DataType.INTEGER })
    product_id: number;

    @BelongsTo(() => Product)
    product: Product;
    
    @Column({ allowNull: false, type: DataType.INTEGER })
    rating: number;
}
