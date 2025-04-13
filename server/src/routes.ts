import { Router } from "express";
import AuthRoutes from "./modules/auth/authRoutes";
import AdminRoutes from "./modules/admin/adminRoutes";
import DistributorRoutes from "./modules/distributors/distributorRoutes";

class AppRouter {
  private static router: Router = Router();

  static get routes() {
    this.router.use("/admin", AdminRoutes.routes);

    this.router.use("/auth", AuthRoutes.routes);
    this.router.use("/distributors", DistributorRoutes.routes);

    return this.router;
  }
}

export default AppRouter;
