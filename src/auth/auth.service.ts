import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProductUserDto } from 'src/user/model/productUser.dto';
import { ProductUser } from 'src/user/model/productUser.model';
import { UserService } from 'src/user/service/user.service';
import { UserSessionService } from './userSession.service';
import { UserSession } from './userSession.model';



@Injectable()
export class AuthService {

    constructor(

        private userSessionService: UserSessionService,

        // @Inject("USER_REPOSITORY")
        private userService: UserService,

        // @Inject(JwtService)
        private jwtService: JwtService
    ) { }

    async signUp(user: ProductUserDto) {

        let currUser = await this.userService.createOne(user)

        return currUser;
    }

    // todo creae a session and sassin token to session table and put the token in jwt

    async signIn(user: ProductUserDto) {

        const currUser: ProductUser = await this.userService.findUserByPK(user.userId);
        if (!currUser || (currUser.password !== user.password)) {
            return null;
        }

        const SESSION_TOKEN = this.userSessionService.genSessionId()
        let userSessionObject = {
            userSessionId: parseInt((Math.random() * 1000).toString()),
            token: SESSION_TOKEN,
            active: true,
            userId: currUser.userId,
        }

        const sess = this.userSessionService.createSession(userSessionObject)

        const payload = { userId: user.userId, username: user.username, token: SESSION_TOKEN };
        let jwtToken: string = await this.jwtService.signAsync(payload)


        return { access_token: jwtToken };
    }

    async validateProfile(req: any) {


        const ALL_USER_SESSIONS: UserSession[] = await this.userSessionService.getSession(req.user.token);

        ALL_USER_SESSIONS.map(item => {
            console.log(item.dataValues);
        });

        console.log("\n\n--------------Details from toekn--------------");
        console.log(`userId: ${req.user.userId}`);
        console.log(`userame: ${req.user.username}`);
        console.log(`session_token: ${req.user.session_token}`);
        console.log(`issued at time: ${req.user.iat}`);
        console.log(`expire at time: ${req.user.exp}`);
        console.log("--------------Details from toekn--------------\n\n");



        console.log(req.user);


    }

}
