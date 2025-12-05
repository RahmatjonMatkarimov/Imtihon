import { Column, Model, Table, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { Product } from 'src/models/products/entities/product.entity';

@Table({ tableName: 'categories', timestamps: true })
export class Category extends Model {
  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    allowNull: false,
  })
  img: string;

  @HasMany(() => Product)
  products: Product[];
}