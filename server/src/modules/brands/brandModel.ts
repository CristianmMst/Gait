import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import type { Product } from "../products/productModel";

@Entity("brands")
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45, unique: true })
  name: string;

  @OneToMany("Product", "brand")
  products: Product[];
}
