import { Router } from "express";
import { createMovieController, readMoviesController } from "../controllers";
import {
  deleteMovieController,
  updateMovieController,
} from "../controllers/movie";
import {
  ensureDataIsValidMiddleware,
  ensureMovieExistsMiddleare,
  ensureNameExistsMiddleare,
} from "../middlewares";
import { createMovieSchema, updateMovieSchema } from "../schemas";

const movieRoutes: Router = Router();

movieRoutes.get("", readMoviesController);

movieRoutes.post(
  "",
  ensureDataIsValidMiddleware(createMovieSchema),
  ensureNameExistsMiddleare,
  createMovieController
);

movieRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateMovieSchema),
  ensureMovieExistsMiddleare,
  ensureNameExistsMiddleare,
  updateMovieController
);

movieRoutes.delete("/:id", ensureMovieExistsMiddleare, deleteMovieController);

export default movieRoutes;
