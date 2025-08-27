import { ProductService } from "./productService";
import { Request, Response, NextFunction } from "express";

export class ProductController {
  private productService = new ProductService();

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { minPrice, maxPrice, categoryId, brandId } = req.query;

      const products = await this.productService.getAll({
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        categoryId: categoryId ? Number(categoryId) : undefined,
        brandId: brandId ? Number(brandId) : undefined,
      });

      res.json(products);
    } catch (error) {
      next(error);
    }
  };
}
