import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { IMovie, IMovieUpdateRequest } from "../interfaces";
import { movieSchema } from "../schemas";

const updateMovieService = async (
  data: IMovieUpdateRequest,
  id: number
): Promise<IMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovie = await movieRepository.findOne({
    where: {
      id: id,
    },
  });

  const movie = movieRepository.create({
    ...oldMovie,
    ...data,
  });

  await movieRepository.save(movie);

  const newMovie = movieSchema.parse(movie);

  return newMovie;
};

export default updateMovieService;
