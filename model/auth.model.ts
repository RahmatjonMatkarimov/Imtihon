import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connentDB.ts";

export class users extends Model {
    username!: string;
    email!: string;
    password!: string;
    otp!: string | null;
    otpTime!: number | null;
    isVerified!: boolean;
    role!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        otpTime: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        tableName: "users",
        timestamps: true,
        sequelize,
    }
);
