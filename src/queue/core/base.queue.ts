import { Queue } from "bullmq";
import { IMessageQueue } from "../queue.interface";
import { queueAdapters } from "../queue.adapter";

export class BaseQueue implements IMessageQueue {

    private queue: Queue
    private queueName

    constructor(queueName: string) {
        this.queueName = queueName
    }

    async publish(payload: any, opt?): Promise<void> {
        const response = await this.queue.add(this.queueName, payload, { removeOnComplete: true })
        console.log(`New Job has been added to queue: ${this.queueName}, has ${response}`);
    }

    public registerQueue(queue) {
        queueAdapters[this.queueName] = queue
        this.queue = new Queue(this.queueName)
    }

}

