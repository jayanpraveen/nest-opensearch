import { Module } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';
import { QueueModule } from 'src/queue/queue.module';
import { SearchModule } from 'src/search/search.module';
import { SearchQueueSubscriber } from './search.subscriber';
import { SearchHandler } from 'src/search/search.handler';

@Module({
    imports: [
        QueueModule,
        SearchModule,
        MoviesModule
    ],
    providers: [
        SearchQueueSubscriber,
        SearchHandler
    ]
})
export class SubscriberModule { }
