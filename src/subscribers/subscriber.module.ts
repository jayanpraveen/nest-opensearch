import { Module, forwardRef } from "@nestjs/common";
import { MoviesModule } from "src/movies/movies.module";
import { MovieSubscriber } from "./core/movie.subscriber";
import { QueueModule } from "src/queue/queue.module";
import { SearchHandler } from "src/search/search.handler";
import { MovieService } from "src/movies/movie.service";
import { moviesProviders } from "src/movies/movie.provider";

@Module({
    imports: [
        forwardRef(() => QueueModule),
        forwardRef(() => MoviesModule),
    ],
    providers: [
        MovieSubscriber,
        SearchHandler,
        MovieService, ...moviesProviders
    ]
})
export class SubscriberModule { }
