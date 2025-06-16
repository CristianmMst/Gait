import { Product } from "../products/productModel";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("brands")
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
