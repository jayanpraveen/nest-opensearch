import { Movie } from "./movie.model";

export const moviesProviders = [
    {
        provide: 'MOVIES_REPOSITORY',
        useValue: Movie,
    },
];

