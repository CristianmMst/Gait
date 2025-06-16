import { Product } from "../products/productModel";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45, unique: true })
  name: string;

  @Column({ type: "varchar", length: 500 })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
