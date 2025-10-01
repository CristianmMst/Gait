import { Product } from "./productModel";
import { AppDataSource } from "@/database";
import { Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);

  async getAll(filters?: {
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
    brandId?: number;
  }) {
    const where: any = {};

    if (filters?.categoryId) {
      where.category = { id: filters.categoryId };
    }

    if (filters?.brandId) {
      where.brand = { id: filters.brandId };
    }

    if (filters?.minPrice && filters?.maxPrice) {
      where.price = Between(filters.minPrice, filters.maxPrice);
    } else if (filters?.minPrice) {
      where.price = MoreThanOrEqual(filters.minPrice);
    } else if (filters?.maxPrice) {
      where.price = LessThanOrEqual(filters.maxPrice);
    }

    return this.productRepository.find({
      where,
      relations: ["brand", "category"],
    });
  }

  async findById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ["brand", "category"],
    });
  }

  async create(data: Partial<Product>): Promise<Product> {
    if (!data.image || data.image.trim() === "") {
      delete data.image;
    }

    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) return null;

    if (
      data.hasOwnProperty("image") &&
      (!data.image || data.image.trim() === "")
    ) {
      delete data.image;
    }

    Object.assign(product, data);
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);
    return result.affected !== 0;
  }
}
