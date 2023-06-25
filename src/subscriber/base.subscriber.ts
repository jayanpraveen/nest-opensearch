import { subscriberMaps } from "src/queue/queue.adapter";
import { Worker } from 'bullmq';

export class BaseSubscriber {

    queueName: string
    constructor(queueName: string) {
        this.queueName = queueName
        this.processHandler = this.processHandler.bind(this);
    }

    register(context) {
        subscriberMaps[this.queueName] = context;
        new Worker(this.queueName, this.processHandler);
    }


    async processHandler(job) {
        await this.handleEventType(job);
    }

    async handleEventType(job) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const context = subscriberMaps[job.queueName];
                // console.log("[SUBLOG]: " + context[job.data.eventType]);
                const ctx = await context[job.data.eventType]();
                // const ctx = await context[job.data.eventType]
                console.log(("[SUBLOG]: " + ctx))
                // await ctx()
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
}


