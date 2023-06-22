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

    @Get("/get")
    getMovie(@Body() opts: { text: string }) {
        return this.moviesService.getMovie(opts.text);
    }

    @Delete("/delete")
    deleteMovie(@Body() opts: { id: string }) {
        return this.moviesService.deleteMovie(opts.id);
    }

}
