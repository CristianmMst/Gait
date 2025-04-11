import { AppDataSource } from "@/database";
import { Distributor } from "./distributorModel";

const distributorRepository = AppDataSource.getRepository(Distributor);

class DistributorService {
  async findOneById(id: number) {
    return await distributorRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await distributorRepository.findOneBy({ email });
  }

  async create(distributor: Distributor) {
    await distributorRepository.save(distributor);
  }
}

export default DistributorService;
