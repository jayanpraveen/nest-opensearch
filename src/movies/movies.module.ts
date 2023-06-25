import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { moviesProviders } from './movie.provider';
import { QueueModule } from 'src/queue/queue.module';
import { OpensearchService } from 'src/search/search.service';
import { SearchModule } from 'src/search/search.module';

@Module({
    controllers: [MovieController],
    imports: [
        DatabaseModule,
        forwardRef(() => SearchModule),
        QueueModule
    ],
    providers: [
        MovieService, ...moviesProviders,
    ],
    exports: [MovieService]
})
export class MoviesModule { }
