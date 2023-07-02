import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, SetMetadata } from "@nestjs/common";
import { MovieDto } from "./movie.dto";
import { MovieService } from "./movie.service";
import { AuthGuard } from "src/auth/auth.gaurd";
import { Public } from "src/auth/public.decorator";

@Controller("/movies")
export class MovieController {

    constructor(private readonly moviesService: MovieService) { }

    @Get('/index')
    @Public()
    index() {
        return "hello from MovieController"
    }

    @Post("/add")
    addMovie(@Body() movieDto: MovieDto, @Request() req) {
        movieDto.userId = req.user.userId;
        return this.moviesService.addMovie(movieDto);
    }

    // @UseGuards(AuthGuard)
    @Get("/searchall")
    searchAll(@Request() req) {
        return this.moviesService.searchAll(req)
    }


    @Put("/update/:id")
    updateMovie(@Param("id") id: string, @Body() opts: { userId: number, name: string, year: number }) {
        return this.moviesService.updateMovie(id, opts);
    }

    @Get("/search")
    searchMovie(@Body() opts: { text: string }) {
        return this.moviesService.searchMovie(opts.text);
    }

    // @UseGuards(AuthGuard)
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
