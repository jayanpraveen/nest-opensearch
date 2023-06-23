import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { moviesProviders } from './movie.provider';
import { SearchModule } from 'src/search/search.module';
import { OpensearchService } from 'src/search/search.service';
import { QueueModule } from 'src/queue/queue.module';

@Module({
    imports: [DatabaseModule, SearchModule, QueueModule],
    controllers: [MovieController],
    providers: [MovieService, ...moviesProviders, OpensearchService],
    exports: [MovieService]
})
export class MoviesModule { }
