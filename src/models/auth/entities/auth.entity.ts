import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/common/enums/role.enum";

@Table({ tableName: 'auths', timestamps: true }) 
export class Auth extends Model {
  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({
      type: DataType.ENUM(...Object.values(Role)),
      allowNull: false,
      defaultValue: Role.Student,
  })
  role: Role;

  @Column({ type: DataType.INTEGER })
  user_id: number; 
}
