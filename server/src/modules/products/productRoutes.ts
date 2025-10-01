import { Router } from "express";
import { ProductController } from "./productController";
import { validateAdmin } from "../admin/middlewares/validateAdmin";

class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productController = new ProductController();

    router.get("/", productController.getProducts);
    router.post("/", validateAdmin, productController.createProduct);
    router.get("/:id", productController.getProductById);
    router.delete("/:id", validateAdmin, productController.deleteProduct);

    return router;
  }
}

export default ProductRoutes;
