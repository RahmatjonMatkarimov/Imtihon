import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Role } from '../../../common/enums/role.enum';
import { Product } from 'src/models/products/entities/product.entity';

@Table({ tableName: 'admins', timestamps: true })
export class Admin extends Model {
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
    type: DataType.ENUM(Role.Admin),
    allowNull: false,
    defaultValue: Role.Admin,
  })
  role: Role;

  @HasMany(() => Product)
  products: Product[];
}
