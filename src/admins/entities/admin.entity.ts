import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { Role } from '../../common/enums/role.enum';

@Table({ tableName: 'admins', timestamps: true })
export class Admin extends Model {
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

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: true })
  img: string;
}
