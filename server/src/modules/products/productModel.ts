import { Brand } from "../brands/brandModel";
import { Category } from "../categories/categoryModel";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  image: string;

  @Column({ type: "varchar", length: 45, nullable: false })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2, unsigned: true })
  price: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column({ type: "varchar", length: 500 })
  description: string;

  @Column({ type: "int", default: 0, unsigned: true })
  stock: number;

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: "CASCADE" })
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  category: Category;
}
