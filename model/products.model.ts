import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connentDB.ts";
import { category } from "./category.model.ts";
import { users } from "./auth.model.ts";

export class product extends Model {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    discount!: number | null;
    color!: string | null;
    size!: string | null;
    rating!: number;
    paymentType?: 'cash' | 'onlinePay';
    isCart?: boolean;
    isLike?: boolean;
    images!: string[];
    category_id!: number;
}

product.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        isCard: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        isLike: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        paymentType: {
            type: DataTypes.ENUM('cash', 'onlinePay'),
            defaultValue: "cash",
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: users,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: category,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        tableName: "products",
        timestamps: true,
        sequelize,
    }
);
