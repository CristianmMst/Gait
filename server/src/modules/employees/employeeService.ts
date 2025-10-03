import { AppDataSource } from "@/database";
import { Employee } from "./employeeModel";

const employeeRepository = AppDataSource.getRepository(Employee);

class EmployeeService {
  async findOneById(id: number) {
    return await employeeRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await employeeRepository.findOne({
      where: { email },
      relations: ["role", "distributor"],
    });
  }

  async findByIdOrEmail(id: number, email: string) {
    return await employeeRepository.findOne({
      where: [{ id }, { email }],
      relations: ["role"],
    });
  }

  async create(employee: Employee) {
    await employeeRepository.save(employee);
  }
}

export default EmployeeService;
