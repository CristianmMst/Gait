import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import type { Order } from "../orders/orderModel";
import { Product } from "../products/productModel";

@Entity("order_products")
@Check(`"quantity" > 0`)
@Check(`"subtotal" > 0`)
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  quantity: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  subtotal: number;

  @ManyToOne("Order", "orderProducts", { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_order" })
  order: Order;

  @ManyToOne(() => Product, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_product" })
  product: Product;
}
