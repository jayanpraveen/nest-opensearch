import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { moviesProviders } from './movie.provider';
import { SearchModule } from 'src/search/search.module';
import { OpensearchService } from 'src/search/search.service';

@Module({
    imports: [DatabaseModule, SearchModule],
    controllers: [MovieController],
    providers: [MovieService, ...moviesProviders, OpensearchService]
})
export class MoviesModule { }
