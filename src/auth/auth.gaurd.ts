import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "./auth.constants";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    private getTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const allowUnauthorizedRequest = this.reflector.get<boolean>('isPublic', context.getHandler());
        return allowUnauthorizedRequest || this.validateRequest(request);

    }

    async validateRequest(request) {

        const token: string = this.getTokenFromHeader(request);

        // console.log(token);

        if (!token) {
            return null
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            console.log("jwt error");
            // throw new UnauthorizedException();
            return null
        }

        return true;
    }
}
