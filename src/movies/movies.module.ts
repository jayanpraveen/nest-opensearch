import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { moviesProviders } from './movie.provider';
import { QueueModule } from 'src/queue/queue.module';
import { OpensearchService } from 'src/search/search.service';
import { SearchModule } from 'src/search/search.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';

@Module({
    controllers: [
        MovieController,
    ],
    imports: [
        DatabaseModule,
        forwardRef(() => SearchModule),
        QueueModule,
        AuthModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '5h' },
        })
    ],
    providers: [
        MovieService, ...moviesProviders,
    ],
    exports: [
        MovieService,
    ]
})
export class MoviesModule { }
