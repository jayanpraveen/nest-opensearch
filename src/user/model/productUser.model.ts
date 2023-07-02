import { Column, Table, Model, PrimaryKey } from "sequelize-typescript";

@Table
export class ProductUser extends Model {

    @PrimaryKey
    @Column
    userId: number;

    @Column
    username: string;

    @Column
    password: string;
}
