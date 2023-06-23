import { Injectable } from "@nestjs/common";
import { QueueEvents, QueueNames } from "../queue.enums";
import { BaseQueue } from "./base.queue";

@Injectable()
export default class MovieQueue extends BaseQueue {
    constructor() {
        super(QueueNames.MOVIE_QUEUE);
        this.registerQueue()
    }

    registerQueue() {
        super.registerQueue(this);
    }

    public async publish(eventType: QueueEvents, payload: any): Promise<void> {
        const record = {
            eventType,
            payload
        }
        await super.publish(record)
    }

}
