import { IMessageQueue } from "./queue.interface";

export const queueAdapters: Record<string, IMessageQueue> = {}
export const subscriberMaps = {}
export const queueMaps: any = {}
