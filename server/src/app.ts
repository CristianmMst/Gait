import cookieParser from "cookie-parser";
import { AppDataSource } from "./database";
import express, { Application, Router } from "express";
import { errorHandler } from "./modules/shared/middlewares/errorHandler";

interface AppOptions {
  port: number;
  routes: Router;
}

class App {
  private port: number;
  private readonly app: Application = express();

  constructor({ port, routes }: AppOptions) {
    this.port = port || 3000;
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(routes);
    this.app.use(errorHandler);
  }

  start() {
    AppDataSource.initialize()
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.log("Error connecting to database", error);
      });
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
