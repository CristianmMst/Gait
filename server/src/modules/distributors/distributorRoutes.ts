import { Router } from "express";
import { DistributorController } from "./distributorController";
import { validateDistributor } from "./middlewares/validateDistributor";

class DistributorRoutes {
  static get routes(): Router {
    const router = Router();
    const distributorController = new DistributorController();

    router.post(
      "/register_employee",
      validateDistributor,
      distributorController.registerEmployee,
    );

    return router;
  }
}

export default DistributorRoutes;
