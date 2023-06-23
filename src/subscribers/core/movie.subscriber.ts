import { QueueNames } from "src/queue/queue.enums";
import { BaseSubscriber } from "./base.subscriber";
import { Inject, forwardRef } from "@nestjs/common";
import { MovieService } from "src/movies/movie.service";
import { SearchHandler } from "src/search/search.handler";


export class MovieSubscriber extends BaseSubscriber {
    constructor(
        private readonly searchHandler: SearchHandler
    ) {
        super(QueueNames.MOVIE_QUEUE);
        this.register();
    }

    register() {
        super.register(this)
    }

    async handleNewMovie() {
        // do syncing here SerachService
        await this.searchHandler.handleMovieSync()
    }

}
