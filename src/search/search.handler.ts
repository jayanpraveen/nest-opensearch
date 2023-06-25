import { Inject, Injectable } from "@nestjs/common";
import { OpensearchService } from "./search.service";
import { MovieService } from "src/movies/movie.service";
import config from "src/config";
@Injectable()
export class SearchHandler {

    constructor(

        private readonly movieService: MovieService,

        // @Inject("opensearch")
        private readonly opensearchService: OpensearchService

    ) { }

    async handleMovieSync() {
        const dataFromDB = await this.movieService.getSingleMoviesFromDB();

        console.log("[DATA FROM DB]: " + JSON.stringify(dataFromDB));

        console.log("[SHAND]: " + this.opensearchService);
        const res = await this.opensearchService.addSinlgeRecord("movie_index", dataFromDB)
    }

}
