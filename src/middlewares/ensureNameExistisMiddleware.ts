import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const ensureNameExistsMiddleare = async (
  request: Request,
  respose: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  if (request.body.name) {
    const findName = await movieRepository.findOne({
      where: {
        name: request.body.name,
      },
    });

    if (findName) {
      throw new AppError("Movie already exists.", 409);
    }
  }

  return next();
};

export { ensureNameExistsMiddleare };
