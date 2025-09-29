import { Router } from "express";
import { ProductController } from "./productController";

class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productController = new ProductController();

    router.get("/", productController.getProducts);
    router.post("/", productController.createProduct);
    router.get("/:id", productController.getProductById);

    return router;
  }
}

export default ProductRoutes;
