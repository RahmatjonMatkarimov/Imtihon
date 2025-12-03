import { Column, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

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
}