import {
  Check,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Order } from "../orders/orderModel";
import type { PaymentMethod } from "../payment_methods/paymentMethodModel";

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

@Entity("payments")
@Check(`"amount" > 0`)
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @ManyToOne("Order", "payments", { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_order" })
  order: Order;

  @ManyToOne("PaymentMethod", "payments", {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "id_payment_method" })
  paymentMethod: PaymentMethod | null;
}
