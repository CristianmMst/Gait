import { Employee } from "../employees/employeeModel";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@Entity("distributors")
export class Distributor {
  @PrimaryColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar", length: 45 })
  location: string;

  @OneToMany(() => Employee, (employee) => employee.distributor)
  employees: Employee[];
}
