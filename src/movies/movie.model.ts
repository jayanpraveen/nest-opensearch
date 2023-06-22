import { Column, Model, Table } from "sequelize-typescript"

@Table
export class Movie extends Model {

    @Column
    name: string

    @Column
    genre: string

    @Column
    year: number

}
