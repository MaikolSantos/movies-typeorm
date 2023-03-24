import express, { Application, json } from "express";
import { errorHandler } from "./errors";
import "express-async-errors";
import { movieRoutes } from "./routers";

const app: Application = express();
app.use(json());

app.use("/movies", movieRoutes);

app.use(errorHandler);

export default app;
