import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { SearchModule } from './search/search.module';
import { SubscriberModule } from './subscriber/subscriber.module';

@Module({
  imports: [MoviesModule, SearchModule, SubscriberModule],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
