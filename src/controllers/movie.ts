import { Request, Response } from "express";
import { IMovie, IMovies, IPagination } from "../interfaces/movies";
import {
  createMovieService,
  readMoviesService,
  updateMovieService,
  deleteMovieService,
} from "../services";

const createMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data = request.body;

  const movie: IMovie = await createMovieService(data);

  return response.status(201).json(movie);
};

const readMoviesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movies: IPagination = await readMoviesService(request.query);

  return response.status(200).json(movies);
};

const updateMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const data = request.body;
  const id: number = Number(request.params.id);

  const movie = await updateMovieService(data, id);

  return response.status(200).json(movie);
};

const deleteMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id: number = Number(request.params.id);

  await deleteMovieService(id);

  return response.status(204).send();
};

export {
  createMovieController,
  readMoviesController,
  updateMovieController,
  deleteMovieController,
};
