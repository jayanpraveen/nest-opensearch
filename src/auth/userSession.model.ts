import { BelongsTo, Column, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductUser } from "src/user/model/productUser.model";

@Table
export class UserSession extends Model {

    @PrimaryKey
    @Column
    userSessionId: number

    @Column
    token: string

    @Column
    active: boolean

    // !FK
    @BelongsTo(() => ProductUser, {
        foreignKey: { name: "userId" },
        // onDelete: 'CASCADE', onUpdate: 'CASCADE'
    })
    // userId: number
    productUser: ProductUser

}
