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

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          message: "ID de producto inválido",
        });
      }

      const productId = Number(id);

      const existingProduct = await this.productService.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          message: "Producto no encontrado",
        });
      }

      const deleted = await this.productService.delete(productId);

      if (!deleted) {
        return res.status(500).json({
          message: "Error al eliminar el producto",
        });
      }

      res.status(200).json({
        message: "Producto eliminado exitosamente",
      });
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
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

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          message: "ID de producto inválido",
        });
      }

      const productId = Number(id);

      const existingProduct = await this.productService.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          message: "Producto no encontrado",
        });
      }

      const updateData: any = {};

      if (name !== undefined) updateData.name = name;
      if (price !== undefined) updateData.price = Number(price);
      if (discount !== undefined) updateData.discount = Number(discount);
      if (description !== undefined) updateData.description = description;
      if (stock !== undefined) updateData.stock = Number(stock);
      if (image !== undefined) updateData.image = image;

      if (brandId !== undefined) {
        const brand = new Brand();
        brand.id = Number(brandId);
        updateData.brand = brand;
      }

      if (categoryId !== undefined) {
        const category = new Category();
        category.id = Number(categoryId);
        updateData.category = category;
      }

      const updatedProduct = await this.productService.update(
        productId,
        updateData
      );

      res.status(200).json({
        message: "Producto actualizado exitosamente",
        product: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  };
}
