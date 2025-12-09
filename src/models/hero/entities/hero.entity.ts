import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'heroes',
})
export class Hero extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;
}
