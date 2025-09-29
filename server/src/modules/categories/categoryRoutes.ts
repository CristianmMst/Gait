import { Router } from "express";
import { CategoryController } from "./categoryController";

class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const categoryController = new CategoryController();

    router.get("/", categoryController.getCategories);
    router.get("/:id", categoryController.getCategoryById);

    return router;
  }
}

export default CategoryRoutes;
