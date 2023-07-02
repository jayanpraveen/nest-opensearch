import { UserSession } from "./userSession.model";

export const userSessionProviders = [
    {
        provide: 'SESSION_REPOSITORY',
        useValue: UserSession,
    },
];
