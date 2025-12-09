import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Role } from 'src/common/enums/role.enum';
import { Comment } from 'src/models/comments/entities/comment.entity';

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
}
