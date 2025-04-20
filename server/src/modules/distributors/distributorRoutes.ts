import { Router } from "express";
import { DistributorController } from "./distributorController";
import { validateDistributor } from "./middlewares/validateDistributor";

class DistributorRoutes {
  static get routes(): Router {
    const router = Router();
    const distributorController = new DistributorController();

    router.post(
      "/signup_employee",
      validateDistributor,
      distributorController.signupEmployee,
    );

    return router;
  }
}

export default DistributorRoutes;
