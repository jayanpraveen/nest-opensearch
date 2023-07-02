import { Inject, Injectable } from '@nestjs/common';
import { ProductUser } from '../model/productUser.model';
import { User } from '../model/user.model';
import { ProductUserDto } from '../model/productUser.dto';

const DATABASE_USER = "Jayan"

@Injectable()
export class UserService {

	constructor(
		@Inject("PRODUCT_USER_REPOSITORY")
		private userRepository: typeof ProductUser
	) { }

	async createOne(user: ProductUserDto) {
		return this.userRepository.create({ ...user })
	}

	async findUserByPK(userPK: number) {
		return this.userRepository.findByPk(userPK);
	}

	public getUserIdByTodo(todo: string): string {
		return `todo: "${todo}" belongs to user "${DATABASE_USER}"`
	}

}
