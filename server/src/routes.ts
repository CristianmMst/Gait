import { Router } from "express";
import AuthRoutes from "./modules/auth/authRoutes";
import AdminRoutes from "./modules/admin/adminRoutes";
import BrandRoutes from "./modules/brands/brandRoutes";
import CategoryRoutes from "./modules/categories/categoryRoutes";
import ProductRoutes from "./modules/products/productRoutes";
import DistributorRoutes from "./modules/distributors/distributorRoutes";
import OrderRoutes from "./modules/orders/orderRoutes";

class AppRouter {
  private static router: Router = Router();

  static get routes() {
    this.router.use("/admin", AdminRoutes.routes);

    this.router.use("/auth", AuthRoutes.routes);
    this.router.use("/products", ProductRoutes.routes);
    this.router.use("/distributors", DistributorRoutes.routes);
    this.router.use("/categories", CategoryRoutes.routes);
    this.router.use("/brands", BrandRoutes.routes);
    this.router.use("/orders", OrderRoutes.routes);

    return this.router;
  }
}

export default AppRouter;
