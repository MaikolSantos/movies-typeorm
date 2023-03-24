import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Movie } from "../entities";
import { movieSchema, createMovieSchema } from "../schemas";
import { moviesSchema } from "../schemas/movies";

type IMovieRequest = z.infer<typeof createMovieSchema>;

type IMovie = z.infer<typeof movieSchema>;

type IMovies = z.infer<typeof moviesSchema>;

type IMovieUpdateRequest = DeepPartial<IMovieRequest>;

interface IPagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: IMovie[];
}

type iMovieRepo = Repository<Movie>;

export { IMovieRequest, IMovie, IMovies, IMovieUpdateRequest, IPagination, iMovieRepo };
