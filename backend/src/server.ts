import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected.");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
