import { Inject, Injectable } from "@nestjs/common";
import { UserSession } from "./userSession.model";

@Injectable()
export class UserSessionService {

    constructor(

        @Inject("SESSION_REPOSITORY")
        private userSessionService: typeof UserSession

    ) { }

    public genSessionId() {
        return (Math.random() + 1).toString(36).substring(7);
    }

    createSession(userSession) {
        console.log("==>> " + JSON.stringify({ ...userSession }));
        return this.userSessionService.create({ ...userSession })
    }

    async getSession(userSessionId: number) {
        return this.userSessionService.findAll({
            where: { token: userSessionId }
        });
    }

}
