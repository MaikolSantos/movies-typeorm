import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { IMovies } from "../interfaces";
import { IPagination } from "../interfaces/movies";
import { moviesSchema } from "../schemas";

const readMoviesService = async (payload: any): Promise<IPagination> => {
  const page: number =
    Number(payload.page) > 0 && Number.isInteger(+payload.page)
      ? Number(payload.page)
      : 1;

  const perPage: number =
    Number(payload.perPage) > 0 &&
    Number.isInteger(+payload.perPage) &&
    Number(payload.perPage) <= 5
      ? Number(payload.perPage)
      : 5;

  const sort =
    payload.sort === "price" || payload.sort === "duration"
      ? payload.sort
      : "id";

  let order =
    payload.order === "asc" || payload.order === "desc" ? payload.order : "asc";

  if (payload.sort == undefined) {
    order = "asc";
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const [data, count] = await movieRepository.findAndCount({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      [sort]: order,
    },
  });

  const baseURL = "http://localhost:3000/movies";

  const prevPage =
    page > 1 ? `${baseURL}?page=${page - 1}&perPage=${perPage}` : null;

  const nextPage =
    page * perPage < count
      ? `${baseURL}?page=${page + 1}&perPage=${perPage}`
      : null;

  const pagination: IPagination = {
    prevPage,
    nextPage,
    count,
    data,
  };

  return pagination;
};

export default readMoviesService;
