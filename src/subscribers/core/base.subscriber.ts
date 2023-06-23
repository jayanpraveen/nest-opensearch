import { Worker } from "bullmq";
import { subscriberMaps } from "src/queue/queue.adapter";

export class BaseSubscriber {

    private queueName;
    private queueType;

    constructor(queueName) {
        this.queueName = queueName
    }

    register(context) {
        subscriberMaps[this.queueName] = context;
        // new Worker(this.queueName, async job => {
        //     console.log(job.data);
        // });
        new Worker(this.queueName, this.handleEventType)
    }

    async handleEventType(job) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const context = subscriberMaps[job.queueName]
                console.log("[QLOG] : " + context[job.data.eventType]);
                await context[job.data.eventType];
                resolve();
            } catch (err) {
                console.log(err);
                reject()
            }

        })
    }

}
