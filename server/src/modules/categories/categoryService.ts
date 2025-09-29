import { Category } from "./categoryModel";
import { AppDataSource } from "@/database";

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  async getAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      order: { name: "ASC" },
    });
  }

  async findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }
}
