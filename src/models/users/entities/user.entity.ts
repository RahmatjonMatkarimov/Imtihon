import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Role } from 'src/common/enums/role.enum';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
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

}
