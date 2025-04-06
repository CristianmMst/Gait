import { Router } from "express";

class AppRouter {
  private static router: Router = Router();

  constructor() {}

  static get routes() {
    this.router.get("/", (_, res) => {
      res.send("Hello World!");
    });
    return this.router;
  }
}

export default AppRouter;
