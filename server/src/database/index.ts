import { DataSource } from "typeorm";
import { Role } from "@/modules/roles/roleModel";
import { Admin } from "@/modules/admin/adminModel";
import { Employee } from "@/modules/employees/employeeModel";
import { Distributor } from "@/modules/distributors/distributorModel";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "@/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Admin, Distributor, Employee, Role],
});
