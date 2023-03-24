import { z } from "zod";

const createMovieSchema = z.object({
  name: z.string().max(50),
  description: z.string().optional().nullable(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const movieSchema = createMovieSchema.extend({
  id: z.number(),
});

const moviesSchema = movieSchema.array();

const updateMovieSchema = createMovieSchema.partial();

export { createMovieSchema, movieSchema, moviesSchema, updateMovieSchema };
