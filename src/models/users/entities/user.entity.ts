import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Role } from 'src/common/enums/role.enum';
import { Comment } from 'src/models/comments/entities/comment.entity';
import { Like } from 'src/models/likes-product/entities/likes-product.entity';
import { PromoUsage } from 'src/models/promo/entities/promo-usage.entity';
import { ShoppingCart } from 'src/models/shopping-cart/entities/shopping-cart.entity';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(Role.User),
    allowNull: false,
    defaultValue: Role.User,
  })
  role: Role;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => ShoppingCart)
  carts: ShoppingCart[];

  @HasMany(() => Like)
  likes: Like[];

  @HasMany(() => PromoUsage)
  promoUsages: PromoUsage[];
}
