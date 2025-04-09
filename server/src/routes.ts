import { Router } from "express";
import AuthRoutes from "./modules/auth/authRoutes";

class AppRouter {
  private static router: Router = Router();

  static get routes() {
    this.router.use("/auth", AuthRoutes.routes);

    return this.router;
  }
}

export default AppRouter;
