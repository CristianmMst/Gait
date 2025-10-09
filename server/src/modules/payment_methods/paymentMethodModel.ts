import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import type { Payment } from "../payments/paymentModel";

@Entity("payment_methods")
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45, nullable: false, unique: true })
  name: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @OneToMany("Payment", "paymentMethod")
  payments: Payment[];
}
