import { AppDataSource } from "@/database";
import { Order } from "../orders/orderModel";
import { Payment, PaymentStatus } from "./paymentModel";
import { PaymentMethod } from "../payment_methods/paymentMethodModel";

interface CreatePaymentData {
  orderId: number;
  paymentMethodId?: number;
  amount: number;
}

interface UpdatePaymentData {
  status?: PaymentStatus;
  amount?: number;
  paymentMethodId?: number;
}

export class PaymentService {
  private paymentRepository = AppDataSource.getRepository(Payment);

  async createWithTransaction(
    data: CreatePaymentData,
    queryRunner: any
  ): Promise<Payment> {
    const order = await queryRunner.manager.findOne(Order, {
      where: { id: data.orderId },
    });

    if (!order) {
      throw new Error(`Orden con ID ${data.orderId} no encontrada`);
    }

    let paymentMethod = null;

    if (data.paymentMethodId) {
      paymentMethod = await queryRunner.manager.findOne(PaymentMethod, {
        where: { id: data.paymentMethodId },
      });

      if (!paymentMethod) {
        throw new Error(
          `Método de pago con ID ${data.paymentMethodId} no encontrado`
        );
      }
    }

    const payment = new Payment();
    payment.amount = data.amount;
    payment.status = PaymentStatus.PENDING;
    payment.order = order;
    payment.paymentMethod = paymentMethod;

    const savedPayment = await queryRunner.manager.save(Payment, payment);

    return savedPayment;
  }

  async create(data: CreatePaymentData): Promise<Payment> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const savedPayment = await this.createWithTransaction(data, queryRunner);
      await queryRunner.commitTransaction();
      return this.findById(savedPayment.id) as Promise<Payment>;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: number): Promise<Payment | null> {
    return this.paymentRepository.findOne({
      where: { id },
      relations: ["order", "paymentMethod"],
    });
  }

  async getByOrder(orderId: number): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { order: { id: orderId } },
      relations: ["paymentMethod"],
      order: {
        id: "ASC",
      },
    });
  }

  async getAll(filters?: { status?: PaymentStatus; orderId?: number }) {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.orderId) {
      where.order = { id: filters.orderId };
    }

    return this.paymentRepository.find({
      where,
      relations: ["order", "paymentMethod"],
      order: {
        id: "DESC",
      },
    });
  }

  async update(id: number, data: UpdatePaymentData): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ["paymentMethod"],
    });

    if (!payment) {
      throw new Error(`Pago con ID ${id} no encontrado`);
    }

    if (data.status !== undefined) {
      payment.status = data.status;
    }

    if (data.amount !== undefined) {
      payment.amount = data.amount;
    }

    if (data.paymentMethodId !== undefined) {
      const paymentMethod = await AppDataSource.getRepository(
        PaymentMethod
      ).findOne({
        where: { id: data.paymentMethodId },
      });

      if (!paymentMethod) {
        throw new Error(
          `Método de pago con ID ${data.paymentMethodId} no encontrado`
        );
      }

      payment.paymentMethod = paymentMethod;
    }

    await this.paymentRepository.save(payment);

    return this.findById(id) as Promise<Payment>;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.paymentRepository.delete(id);
    return result.affected !== 0;
  }
}
