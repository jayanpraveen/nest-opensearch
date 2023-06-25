import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { opensearchProvider } from 'src/database/opensearch.provider';
import { OpensearchService } from './search.service';
import { SearchHandler } from './search.handler';
import { MoviesModule } from 'src/movies/movies.module';


@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => MoviesModule),
    ],
    providers: [
        OpensearchService, ...opensearchProvider,
    ],
    exports: [OpensearchService, ...opensearchProvider]
})

export class SearchModule { }
