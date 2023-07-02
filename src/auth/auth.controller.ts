import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';
import { ProductUser } from 'src/user/model/productUser.model';
import { ProductUserDto } from 'src/user/model/productUser.dto';
import { Public } from './public.decorator';

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('/signup')
    signUp(@Body() user: ProductUserDto) {
        return this.authService.signUp(user);
    }

    @Public()
    @Post('/signin')
    signIn(@Body() user: ProductUserDto) {
        return this.authService.signIn(user);
    }

    // @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Request() req) {
        this.authService.validateProfile(req)
        return req.user;
    }

    // @UseGuards(AuthGuard)
    @Get('/profile')
    signOut(@Request() req) {
        console.log("req: " + JSON.stringify(req.user));
        return req.user;
    }
}
