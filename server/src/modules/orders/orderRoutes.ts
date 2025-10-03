import { Router } from "express";
import { OrderController } from "./orderController";

class OrderRoutes {
  static get routes(): Router {
    const router = Router();
    const orderController = new OrderController();

    router.post("/", orderController.createOrder);
    router.get("/", orderController.getOrders);
    router.get("/:id", orderController.getOrderById);
    router.delete("/:id", orderController.deleteOrder);

    router.get(
      "/distributor/:distributorId",
      orderController.getOrdersByDistributor
    );
    router.get("/employee/:employeeId", orderController.getOrdersByEmployee);

    return router;
  }
}

export default OrderRoutes;
