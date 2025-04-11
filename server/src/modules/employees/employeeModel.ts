import { Role } from "../roles/roleModel";
import { Distributor } from "../distributors/distributorModel";
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

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

  @ManyToOne(() => Distributor, (distributor) => distributor.employees)
  distributor: Distributor;
}
