import app from "./app";
import "dotenv/config";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected.")

    const PORT = Number(process.env.PORT);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
