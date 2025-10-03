import { Payment } from "../payments/paymentModel";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("payment_methods")
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45, nullable: false, unique: true })
  name: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @OneToMany(() => Payment, (payment) => payment.paymentMethod)
  payments: Payment[];
}
