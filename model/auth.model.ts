import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connentDB.ts';

export class users extends Model {
    username!: string;
}
users.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false 
    }
},{
    tableName: "users",
    timestamps: true,
    sequelize
})