import { Module } from "@nestjs/common";
import { QueueService } from "./queue.service";
import MovieQueue from "./core/movie.queue";

@Module({
    providers: [
        QueueService,
        MovieQueue
    ],
    exports: [QueueService]
})
export class QueueModule { }
