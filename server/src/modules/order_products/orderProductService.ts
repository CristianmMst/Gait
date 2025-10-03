import { AppDataSource } from "@/database";
import { Order } from "../orders/orderModel";
import { Product } from "../products/productModel";
import { OrderProduct } from "./orderProductModel";

interface CreateOrderProductData {
  orderId: number;
  productId: number;
  quantity: number;
}

interface UpdateOrderProductData {
  quantity?: number;
}

export class OrderProductService {
  private orderProductRepository = AppDataSource.getRepository(OrderProduct);

  async findById(id: number): Promise<OrderProduct | null> {
    return this.orderProductRepository.findOne({
      where: { id },
      relations: ["order", "product", "product.brand", "product.category"],
    });
  }

  async getByOrder(orderId: number): Promise<OrderProduct[]> {
    return this.orderProductRepository.find({
      where: { order: { id: orderId } },
      relations: ["product", "product.brand", "product.category"],
      order: {
        id: "ASC",
      },
    });
  }

  async createWithTransaction(
    data: CreateOrderProductData,
    queryRunner: any
  ): Promise<OrderProduct> {
    const order = await queryRunner.manager.findOne(Order, {
      where: { id: data.orderId },
    });

    if (!order) {
      throw new Error(`Orden con ID ${data.orderId} no encontrada`);
    }

    const product = await queryRunner.manager.findOne(Product, {
      where: { id: data.productId },
    });

    if (!product) {
      throw new Error(`Producto con ID ${data.productId} no encontrado`);
    }

    if (product.stock < data.quantity) {
      throw new Error(
        `Stock insuficiente para el producto ${product.name}. Disponible: ${product.stock}, Solicitado: ${data.quantity}`
      );
    }

    const unitPrice = Number(product.price);
    const subtotal = data.quantity * unitPrice;

    const orderProduct = new OrderProduct();
    orderProduct.order = order;
    orderProduct.product = product;
    orderProduct.quantity = data.quantity;
    orderProduct.subtotal = subtotal;

    const savedOrderProduct = await queryRunner.manager.save(
      OrderProduct,
      orderProduct
    );

    order.total = Number(order.total) + subtotal;
    await queryRunner.manager.save(Order, order);

    product.stock -= data.quantity;
    await queryRunner.manager.save(Product, product);

    return savedOrderProduct;
  }

  async create(data: CreateOrderProductData): Promise<OrderProduct> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const savedOrderProduct = await this.createWithTransaction(
        data,
        queryRunner
      );
      await queryRunner.commitTransaction();
      return this.findById(savedOrderProduct.id) as Promise<OrderProduct>;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    data: UpdateOrderProductData
  ): Promise<OrderProduct> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderProduct = await this.orderProductRepository.findOne({
        where: { id },
        relations: ["order", "product"],
      });

      if (!orderProduct) {
        throw new Error(`OrderProduct con ID ${id} no encontrado`);
      }

      const oldQuantity = orderProduct.quantity;
      const oldSubtotal = orderProduct.subtotal;
      const product = orderProduct.product;
      const order = orderProduct.order;

      if (data.quantity !== undefined && data.quantity !== oldQuantity) {
        const quantityDifference = data.quantity - oldQuantity;

        if (quantityDifference > 0) {
          if (product.stock < quantityDifference) {
            throw new Error(
              `Stock insuficiente para el producto ${product.name}. Disponible: ${product.stock}, Requerido adicional: ${quantityDifference}`
            );
          }
        }

        orderProduct.quantity = data.quantity;
        product.stock -= quantityDifference;
      }

      const unitPrice = Number(product.price);
      const newSubtotal = orderProduct.quantity * unitPrice;
      const subtotalDifference = newSubtotal - oldSubtotal;
      orderProduct.subtotal = newSubtotal;

      // Convertir explícitamente a número para evitar concatenación de strings
      order.total = Number(order.total) + subtotalDifference;

      await queryRunner.manager.save(OrderProduct, orderProduct);
      await queryRunner.manager.save(Order, order);
      await queryRunner.manager.save(Product, product);

      await queryRunner.commitTransaction();

      return this.findById(id) as Promise<OrderProduct>;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderProduct = await this.orderProductRepository.findOne({
        where: { id },
        relations: ["order", "product"],
      });

      if (!orderProduct) {
        throw new Error(`OrderProduct con ID ${id} no encontrado`);
      }

      const product = orderProduct.product;
      product.stock += orderProduct.quantity;
      await queryRunner.manager.save(Product, product);

      const order = orderProduct.order;
      // Convertir explícitamente a número para evitar concatenación de strings
      order.total = Number(order.total) - Number(orderProduct.subtotal);
      await queryRunner.manager.save(Order, order);

      await queryRunner.manager.delete(OrderProduct, id);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
