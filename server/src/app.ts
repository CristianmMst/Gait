import express, { Application, Router } from "express";

interface AppOptions {
  port: number;
  routes: Router;
}

class App {
  private port: number;
  private app: Application = express();

  constructor({ port, routes }: AppOptions) {
    this.port = port || 3000;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(routes);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
