import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { opensearchProvider } from 'src/database/opensearch.provider';
import { OpensearchService } from './search.service';


@Module({
    imports: [DatabaseModule],
    providers: [OpensearchService, ...opensearchProvider],
    exports: [OpensearchService]
})

export class SearchModule { }
