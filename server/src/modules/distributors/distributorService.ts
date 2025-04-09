import { AppDataSource } from "@/database";
import { Distributor } from "./distributorModel";

const distributorRepository = AppDataSource.getRepository(Distributor);

class DistributorService {
  async findOneById(id: number) {
    const distributor = await distributorRepository.findOneBy({ id });
    return distributor;
  }

  async create(distributor: {
    id: number;
    name: string;
    email: string;
    password: string;
    location: string;
  }) {
    await distributorRepository.save(distributor);
  }
}

export default DistributorService;
