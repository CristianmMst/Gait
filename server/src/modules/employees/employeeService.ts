import { AppDataSource } from "@/database";
import { Employee } from "./employeeModel";

const employeeRepository = AppDataSource.getRepository(Employee);

class EmployeeService {
  async findOneById(id: number) {
    return await employeeRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await employeeRepository.findOneBy({ email });
  }

  async create(employee: Employee) {
    await employeeRepository.save(employee);
  }
}

export default EmployeeService;
