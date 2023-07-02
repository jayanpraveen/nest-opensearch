import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/user/user.provider';
import { UserService } from 'src/user/service/user.service';
import { UserSessionService } from './userSession.service';
import { userSessionProviders } from './userSession.provider';


@Module({
  imports: [
    UserModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserSessionService, ...userSessionProviders],
  exports: [AuthService, UserSessionService,]
})
export class AuthModule { }
