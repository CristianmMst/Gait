import { ProductService } from "./productService";
import { Request, Response, NextFunction } from "express";
import { Brand } from "../brands/brandModel";
import { Category } from "../categories/categoryModel";

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

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await this.productService.findById(Number(id));
      if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        price,
        discount,
        description,
        stock,
        image,
        brandId,
        categoryId,
      } = req.body;

      if (!name || !price || !brandId || !categoryId) {
        return res.status(400).json({
          message:
            "Los campos name, price, brandId y categoryId son requeridos",
        });
      }

      const brand = new Brand();
      brand.id = Number(brandId);

      const category = new Category();
      category.id = Number(categoryId);

      const productData = {
        name,
        price: Number(price),
        discount: discount ? Number(discount) : 0,
        description: description || "",
        stock: stock ? Number(stock) : 0,
        image: image || "",
        brand,
        category,
      };

      const newProduct = await this.productService.create(productData);

      res.status(201).json({
        message: "Producto creado exitosamente",
        product: newProduct,
      });
    } catch (error) {
      next(error);
    }
  };
}
