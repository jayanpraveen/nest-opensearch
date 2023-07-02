import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [],
	providers: [...userProviders, UserService],
	exports: [UserService]
})
export class UserModule { }
