import { Router } from "express";
import AuthController from "./authController";
import { validateToken } from "./middlewares/validateToken";

class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authController = new AuthController();

    router.post("/login", authController.login);
    router.post("/register", validateToken, authController.register);

    return router;
  }
}

export default AuthRoutes;
