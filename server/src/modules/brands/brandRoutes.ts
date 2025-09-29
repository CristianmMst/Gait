import { Router } from "express";
import { BrandController } from "./brandController";

class BrandRoutes {
  static get routes(): Router {
    const router = Router();
    const brandController = new BrandController();

    router.get("/", brandController.getBrands);
    router.get("/:id", brandController.getBrandById);

    return router;
  }
}

export default BrandRoutes;
