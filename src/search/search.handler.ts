import { Inject, Injectable } from "@nestjs/common";
import { OpensearchService } from "./search.service";
import { MovieService } from "src/movies/movie.service";
import config from "src/config";

@Injectable()
export class SearchHandler {

    constructor(

        private readonly movieService: MovieService,

        @Inject("opensearch")
        private readonly opensearchService: OpensearchService

    ) { }

    async handleMovieSync() {
        // const id = ""
        const dataFromDB = await this.movieService.getSingleMoviesFromDB();

        console.log("[DATA FROM DB]: " + dataFromDB);


        if (dataFromDB) {
            await this.opensearchService.addSinlgeRecord(config().opensearchIndexName, dataFromDB)
        }
    }

}
