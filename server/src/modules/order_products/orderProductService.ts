import { Order } from "../orders/orderModel";
import { Product } from "../products/productModel";
import { OrderProduct } from "./orderProductModel";

interface CreateOrderProductData {
  orderId: number;
  productId: number;
  quantity: number;
}

export class OrderProductService {
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
}
