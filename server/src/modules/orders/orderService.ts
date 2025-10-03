import { Order } from "./orderModel";
import { AppDataSource } from "@/database";
import { Employee } from "../employees/employeeModel";
import { Distributor } from "../distributors/distributorModel";
import { OrderProductService } from "../order_products/orderProductService";
import { PaymentService } from "../payments/paymentService";

interface CreateOrderProductData {
  id: number;
  quantity: number;
}

interface CreateOrderData {
  employeeId: number;
  distributorId: number;
  orderDate: Date;
  dispatchDate: Date;
  deliveryDate: Date;
  products: CreateOrderProductData[];
}

export class OrderService {
  private orderRepository = AppDataSource.getRepository(Order);
  private employeeRepository = AppDataSource.getRepository(Employee);
  private distributorRepository = AppDataSource.getRepository(Distributor);
  private orderProductService = new OrderProductService();
  private paymentService = new PaymentService();

  async create(data: CreateOrderData): Promise<Order> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const employee = await this.employeeRepository.findOne({
        where: { id: data.employeeId },
      });

      if (!employee) {
        throw new Error(`Empleado con ID ${data.employeeId} no encontrado`);
      }

      const distributor = await this.distributorRepository.findOne({
        where: { id: data.distributorId },
      });

      if (!distributor) {
        throw new Error(
          `Distribuidor con ID ${data.distributorId} no encontrado`
        );
      }

      const order = new Order();
      order.total = 0;
      order.order_date = data.orderDate;
      order.dispatch_date = data.dispatchDate;
      order.delivery_date = data.deliveryDate;
      order.employee = employee;
      order.distributor = distributor;

      const savedOrder = await queryRunner.manager.save(Order, order);

      for (const productData of data.products) {
        await this.orderProductService.createWithTransaction(
          {
            orderId: savedOrder.id,
            productId: productData.id,
            quantity: productData.quantity,
          },
          queryRunner
        );
      }

      const updatedOrder = await queryRunner.manager.findOne(Order, {
        where: { id: savedOrder.id },
      });

      await this.paymentService.createWithTransaction(
        {
          orderId: savedOrder.id,
          amount: updatedOrder!.total,
        },
        queryRunner
      );

      await queryRunner.commitTransaction();

      return this.findById(savedOrder.id) as Promise<Order>;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: [
        "employee",
        "distributor",
        "orderProducts",
        "orderProducts.product",
        "orderProducts.product.brand",
        "orderProducts.product.category",
        "payments",
        "payments.paymentMethod",
      ],
    });
  }

  async getAll(filters?: {
    employeeId?: number;
    distributorId?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    const where: any = {};

    if (filters?.employeeId) {
      where.employee = { id: filters.employeeId };
    }

    if (filters?.distributorId) {
      where.distributor = { id: filters.distributorId };
    }

    return this.orderRepository.find({
      where,
      relations: [
        "employee",
        "distributor",
        "orderProducts",
        "orderProducts.product",
        "orderProducts.product.brand",
        "orderProducts.product.category",
        "payments",
        "payments.paymentMethod",
      ],
      order: {
        order_date: "DESC",
      },
    });
  }

  async getByDistributor(distributorId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { distributor: { id: distributorId } },
      relations: [
        "employee",
        "distributor",
        "orderProducts",
        "orderProducts.product",
        "orderProducts.product.brand",
        "orderProducts.product.category",
        "payments",
        "payments.paymentMethod",
      ],
      order: {
        order_date: "DESC",
      },
    });
  }

  async getByEmployee(employeeId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { employee: { id: employeeId } },
      relations: [
        "employee",
        "distributor",
        "orderProducts",
        "orderProducts.product",
        "orderProducts.product.brand",
        "orderProducts.product.category",
        "payments",
        "payments.paymentMethod",
      ],
      order: {
        order_date: "DESC",
      },
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);
    return result.affected !== 0;
  }
}
