import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import type { Product } from "../products/productModel";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45, unique: true })
  name: string;

  @Column({ type: "varchar", length: 500 })
  description: string;

  @OneToMany("Product", "category")
  products: Product[];
}
