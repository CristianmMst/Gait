import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Brand } from "../brands/brandModel";
import type { Category } from "../categories/categoryModel";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    default:
      "https://ik.imagekit.io/ProjectGait/no_image_available.png?updatedAt=1759163953976",
  })
  image: string;

  @Column({ type: "varchar", length: 80, nullable: false })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2, unsigned: true })
  price: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  discount: number;

  @Column({ type: "varchar", length: 500 })
  description: string;

  @Column({ type: "int", default: 0, unsigned: true })
  stock: number;

  @ManyToOne("Brand", "products", { onDelete: "CASCADE" })
  brand: Brand;

  @ManyToOne("Category", "products", { onDelete: "CASCADE" })
  category: Category;
}
