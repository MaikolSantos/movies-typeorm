import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { IMovie, IMovieRequest } from "../interfaces";
import { movieSchema } from "../schemas";

const createMovieService = async (data: IMovieRequest): Promise<IMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let movie = movieRepository.create(data);

  await movieRepository.save(movie);

  movie = movieSchema.parse(movie);

  return movie;
};

export default createMovieService;
