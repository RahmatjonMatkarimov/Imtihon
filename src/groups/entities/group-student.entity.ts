import { Table, Model, Column, ForeignKey } from "sequelize-typescript";
import { Group } from "./group.entity";
import { Auth } from "../../auth/entities/auth.entity";

@Table({ tableName: "group_students", timestamps: false })
export class GroupStudent extends Model {
    @ForeignKey(() => Group)
    @Column
    groupId: number;

    @ForeignKey(() => Auth)
    @Column
    studentId: number;
}