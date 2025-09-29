import { CategoryService } from "./categoryService";
import { Request, Response, NextFunction } from "express";

export class CategoryController {
  private categoryService = new CategoryService();

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.getAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await this.categoryService.findById(Number(id));
      if (!category) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }
      res.json(category);
    } catch (error) {
      next(error);
    }
  };
}
