import { Role } from "../roles/roleModel";
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import type { Distributor } from "../distributors/distributorModel";

@Entity("employees")
export class Employee {
  @PrimaryColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45 })
  lastname: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column("tinyint", { default: 0 })
  state: number;

  @Column({ type: "varchar", length: 20 })
  phone: string;

  @ManyToOne(() => Role)
  @JoinColumn()
  role: Role;

  @ManyToOne("Distributor", "employees")
  distributor: Distributor;
}
