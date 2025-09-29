import { Brand } from "./brandModel";
import { AppDataSource } from "@/database";

export class BrandService {
  private brandRepository = AppDataSource.getRepository(Brand);

  async getAll(): Promise<Brand[]> {
    return this.brandRepository.find({
      order: { name: "ASC" },
    });
  }

  async findById(id: number): Promise<Brand | null> {
    return this.brandRepository.findOne({
      where: { id },
    });
  }
}
