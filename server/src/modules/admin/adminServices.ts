import { Admin } from "./adminModel";
import { AppDataSource } from "@/database";

const adminRepository = AppDataSource.getRepository(Admin);

class AdminService {
  async findOneById(id: number) {
    return await adminRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await adminRepository.findOneBy({ email });
  }
}

export default AdminService;
