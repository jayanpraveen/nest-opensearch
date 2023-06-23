import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { opensearchProvider } from 'src/database/opensearch.provider';
import { OpensearchService } from './search.service';
import { SearchHandler } from './search.handler';
import { MovieSubscriber } from 'src/subscribers/core/movie.subscriber';


@Module({
    imports: [DatabaseModule],
    providers: [OpensearchService, ...opensearchProvider, MovieSubscriber],
    exports: [OpensearchService]
})

export class SearchModule { }
