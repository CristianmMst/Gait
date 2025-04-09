import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 45, unique: true })
  name: string;

  @Column({ type: "text" })
  description: string;
}
