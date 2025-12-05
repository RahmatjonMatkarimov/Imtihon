import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { Category } from "src/models/category/entities/category.entity";
import { User } from "src/models/users/entities/user.entity";

@Table({ tableName: "products", timestamps: true })
export class Product extends Model<Product> {
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @Column({ type: DataType.JSONB, allowNull: true })
    attributes: any;

    @Column({ type: DataType.STRING, allowNull: false })
    img: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    owner_id: number;

    @BelongsTo(() => User)
    owner: User;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: false })
    category_id: number;

    @BelongsTo(() => Category)
    category: Category;
}