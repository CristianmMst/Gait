import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;
}
