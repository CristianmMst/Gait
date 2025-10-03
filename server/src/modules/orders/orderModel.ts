import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Employee } from "../employees/employeeModel";
import { Distributor } from "../distributors/distributorModel";
import { OrderProduct } from "../order_products/orderProductModel";
import { Payment } from "../payments/paymentModel";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  total: number;

  @Column({ type: "datetime", nullable: false })
  order_date: Date;

  @Column({ type: "datetime", nullable: false })
  dispatch_date: Date;

  @Column({ type: "datetime", nullable: false })
  delivery_date: Date;

  @ManyToOne(() => Employee, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_employees" })
  employee: Employee;

  @ManyToOne(() => Distributor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_distributor" })
  distributor: Distributor;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
