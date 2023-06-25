import { SearchHandler } from "src/search/search.handler";
import { BaseSubscriber } from "./base.subscriber";
import { Inject, Injectable } from "@nestjs/common";
import config from "src/config";
import { QueueNames } from "src/queue/queue.enums";

@Injectable()
export class SearchQueueSubscriber extends BaseSubscriber {

    constructor(
        private searchHandler: SearchHandler
    ) {
        super(QueueNames.MOVIE_QUEUE);
        this.register();
    }

    register() {
        super.register(this);
    }

    async handleNewMovie() {
        await this.searchHandler.handleMovieSync();
    }
}
