import { Inject, Injectable } from "@nestjs/common";
import { Movie } from "./movie.model";
import { MovieDto } from "./movie.dto";
import { OpensearchService } from "src/search/search.service";
import { QueueService } from "src/queue/queue.service";
import { QueueEvents, QueueNames } from "src/queue/queue.enums";

const OPENSEARCH_MOVIE_INDEX = "movie_index"

@Injectable()
export class MovieService {
    constructor(
        @Inject("MOVIES_REPOSITORY")
        private readonly movieRespository: typeof Movie,

        // @Inject("opensearch")
        private readonly opensearchService: OpensearchService,

        private readonly queueService: QueueService
    ) { }

    async getMovieFromDB(id: string) {
        return await this.movieRespository.findByPk(id);
    }
    async getSingleMoviesFromDB() {
        const s: Movie[] = await this.movieRespository.findAll()
        return s[s.length - 1]
    }

    async addMovie(movieDto: MovieDto) {
        // await this.movieRespository.create({ ...movieDto })
        // await this.opensearchService.addSinlgeRecord(OPENSEARCH_MOVIE_INDEX, movieDto)

        /** Adding payload to DB */
        await this.movieRespository.create({ ...movieDto })

        // Check if index is Present if not create it then proceed
        if (! await this.opensearchService.doesIndexExists(OPENSEARCH_MOVIE_INDEX)) {
            await this.opensearchService.createIndex(OPENSEARCH_MOVIE_INDEX, {});
        }

        /** Syncing payload which is prevsly added to db to opensearch */
        await this.queueService.publish(QueueNames.MOVIE_QUEUE, QueueEvents.HANDLE_NEW_MOVIE, movieDto)

    }

    async updateMovie(id, movieDto: MovieDto) {
        await this.opensearchService.updateRecord(OPENSEARCH_MOVIE_INDEX, id, movieDto)
    }

    async searchMovie(body: string) {
        const query = {
            query: {
                match: {
                    name: {
                        query: body,
                        operator: "and",
                        fuzziness: "auto"
                    }
                }
            }
        }
        if (this.opensearchService.doesIndexExists(OPENSEARCH_MOVIE_INDEX)) {
            return await this.opensearchService.searchRecord(OPENSEARCH_MOVIE_INDEX, query, body)
        }

        return;
    }

    async searchAggMovie(body: any) {
        if (this.opensearchService.doesIndexExists(OPENSEARCH_MOVIE_INDEX)) {
            return await this.opensearchService.searchAggRecord(OPENSEARCH_MOVIE_INDEX, body)
        }
        return;
    }

    async deleteMovie(id: string) {
        const query = {
            query: {
                match: {
                    year: id
                }
            }
        }
        this.opensearchService.doesIndexExists(OPENSEARCH_MOVIE_INDEX) && (
            await this.opensearchService.deleteRecord(OPENSEARCH_MOVIE_INDEX, query)
        )

    }

}

