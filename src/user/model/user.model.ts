import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Model } from "sequelize"
import { Table } from "sequelize-typescript"

@Table
export class User extends Model {

	@IsString()
	firstName: string

	@IsNotEmpty()
	@IsString()
	lastName?: string

	@IsNotEmpty()
	@IsNumber()
	age?: number

}
