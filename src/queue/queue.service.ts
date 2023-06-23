import { Injectable } from "@nestjs/common";
import { QueueEvents, QueueNames } from "./queue.enums";
import { IMessageQueue } from "./queue.interface";
import { queueAdapters } from "./queue.adapter";

@Injectable()
export class QueueService {
    public async publish(queueName: QueueNames, queueEvent: QueueEvents, payload: any): Promise<void> {
        const queue: IMessageQueue = queueAdapters[queueName]
        queue.publish(queueEvent, payload)
    }
}
