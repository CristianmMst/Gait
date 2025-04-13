import { Router } from "express";
import { AdminController } from "./adminController";
import { validateAdmin } from "./middlewares/validateAdmin";

class AdminRoutes {
  static get routes(): Router {
    const router = Router();
    const adminController = new AdminController();

    router.post("/login", adminController.login);
    router.get("/generate_token", validateAdmin, adminController.generateToken);

    return router;
  }
}

export default AdminRoutes;
