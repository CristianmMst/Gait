import { DataSource } from "typeorm";
import { Role } from "@/modules/roles/roleModel";
import { Admin } from "@/modules/admin/adminModel";
import { Employee } from "@/modules/employees/employeeModel";
import { Distributor } from "@/modules/distributors/distributorModel";
import { Brand } from "@/modules/brands/brandModel";
import { Product } from "@/modules/products/productModel";
import { Category } from "@/modules/categories/categoryModel";
import { Order } from "@/modules/orders/orderModel";
import { OrderProduct } from "@/modules/order_products/orderProductModel";
import { PaymentMethod } from "@/modules/payment_methods/paymentMethodModel";
import { Payment } from "@/modules/payments/paymentModel";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "@/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  charset: "utf8mb4",
  logging: true,
  entities: [
    Admin,
    Distributor,
    Employee,
    Role,
    Product,
    Brand,
    Category,
    Order,
    OrderProduct,
    PaymentMethod,
    Payment,
  ],
});
