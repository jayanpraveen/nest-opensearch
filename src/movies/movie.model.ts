import { Column, Model, Table } from "sequelize-typescript"

@Table
export class Movie extends Model {

    @Column
    userId: number

    @Column
    name: string

    @Column
    year: number

}
