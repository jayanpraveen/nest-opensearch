export interface IMessageQueue {
    publish(eventName: any, payload: any): void;
    // getOptions(): any;
    // addToGlobalQueuesList(): void;
    // getName(): string;
}
