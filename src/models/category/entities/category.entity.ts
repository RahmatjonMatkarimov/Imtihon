import { Column, Model, Table, CreatedAt, UpdatedAt, HasMany, DataType } from 'sequelize-typescript';
import { Product } from 'src/models/products/entities/product.entity';

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model {
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
  title: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  img: string;

  @HasMany(() => Product)
  products: Product[];
}