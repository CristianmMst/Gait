import { Router } from "express";
import { MercadoPagoController } from "./mercadopagoController";
import { validateSession } from "../auth/middlewares/validateSession";

class MercadoPagoRoutes {
  static get routes(): Router {
    const router = Router();
    const mercadopagoController = new MercadoPagoController();

    router.post(
      "/preference",
      validateSession,
      mercadopagoController.createPreference
    );
    router.post("/webhook", mercadopagoController.webhook);

    return router;
  }
}

export default MercadoPagoRoutes;
