import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connentDB.ts";
import { users } from "./auth.model.ts";

export class category extends Model {
    name!: string;
    owner_id!: number;
    image!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users, 
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        tableName: "categories",
        timestamps: true,
        sequelize,
    }
);
