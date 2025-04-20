import { Router } from "express";
import AuthController from "./authController";
import { validateToken } from "./middlewares/validateToken";
import { validateSession } from "./middlewares/validateSession";

class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authController = new AuthController();

    router.post("/login", authController.login);
    router.post("/signup", validateToken, authController.signup);

    router.get("/verify", validateSession, authController.verifySession);

    return router;
  }
}

export default AuthRoutes;
