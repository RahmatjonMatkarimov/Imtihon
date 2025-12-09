import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import { Admin } from "src/models/admins/entities/admin.entity";
import { Category } from "src/models/category/entities/category.entity";
import { Comment } from "src/models/comments/entities/comment.entity";
import { Like } from "src/models/likes-product/entities/likes-product.entity";
import { ShoppingCart } from "src/models/shopping-cart/entities/shopping-cart.entity";

@Table({ tableName: "products", timestamps: true })
export class Product extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    count: number;

    @Column({ type: DataType.DATE, allowNull: false })
    guaranteed: Date;

    @Column({ type: DataType.JSONB, allowNull: false })
    attributes: any;

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
    images: string[];

    @ForeignKey(() => Admin)
    @Column({ type: DataType.INTEGER, allowNull: false })
    owner_id: number;

    @BelongsTo(() => Admin)
    owner: Admin;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: false })
    category_id: number;

    @BelongsTo(() => Category)
    category: Category;

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => ShoppingCart)
    carts: ShoppingCart[];

    @HasMany(() => Like)
    likes: Like[];
}