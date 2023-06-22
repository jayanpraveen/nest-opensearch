import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./movie.dto";

@Controller("/movies")
export class MovieController {

    constructor(private readonly moviesService: MovieService) { }

    @Post("/add")
    addMovie(@Body() movieDto: MovieDto) {
        return this.moviesService.addMovie(movieDto);
    }

    @Put("/update/:id")
    updateMovie(@Param("id") id: string, @Body() opts: { name: string, year: number }) {
        return this.moviesService.updateMovie(id, opts);
    }

    @Get("/search")
    searchMovie(@Body() opts: { text: string }) {
        return this.moviesService.searchAggMovie(opts.text);
    }

    @Get("/search/agg")
    searchAggMovie(@Body() opts: { agg_name: string, type: string, field: string, }) {
        console.log();
        return this.moviesService.searchAggMovie(opts);
    }


    @Delete("/delete")
    deleteMovie(@Body() opts: { id: string }) {
        return this.moviesService.deleteMovie(opts.id);
    }

}
