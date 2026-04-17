import { Order } from "../../src/modules/orders/orderModel";
import { Product } from "../../src/modules/products/productModel";
import { OrderProduct } from "../../src/modules/order_products/orderProductModel";
import { OrderProductService } from "../../src/modules/order_products/orderProductService";

describe("OrderProductService.createWithTransaction", () => {
  it("calcula el subtotal y actualiza el total y el stock", async () => {
    const service = new OrderProductService();

    const order = { id: 1, total: 10000 } as Order;
    const product = {
      id: 2,
      name: "Bota industrial",
      price: 2500,
      stock: 10,
    } as Product;

    const findOne = jest
      .fn()
      .mockResolvedValueOnce(order)
      .mockResolvedValueOnce(product);

    const save = jest.fn().mockImplementation(async (_entity, data) => {
      if (data instanceof OrderProduct) {
        return { ...data, id: 99 };
      }

      return data;
    });

    const queryRunner = {
      manager: {
        findOne,
        save,
      },
    };

    const result = await service.createWithTransaction(
      {
        orderId: 1,
        productId: 2,
        quantity: 3,
      },
      queryRunner
    );

    expect(findOne).toHaveBeenNthCalledWith(1, Order, { where: { id: 1 } });
    expect(findOne).toHaveBeenNthCalledWith(2, Product, { where: { id: 2 } });

    expect(save).toHaveBeenNthCalledWith(
      1,
      OrderProduct,
      expect.objectContaining({
        order,
        product,
        quantity: 3,
        subtotal: 7500,
      })
    );
    expect(save).toHaveBeenNthCalledWith(2, Order, order);
    expect(save).toHaveBeenNthCalledWith(3, Product, product);

    expect(order.total).toBe(17500);
    expect(product.stock).toBe(7);
    expect(result).toEqual(
      expect.objectContaining({
        id: 99,
        quantity: 3,
        subtotal: 7500,
      })
    );
  });

  it("lanza un error si no hay stock suficiente", async () => {
    const service = new OrderProductService();

    const order = { id: 1, total: 0 } as Order;
    const product = {
      id: 2,
      name: "Bota industrial",
      price: 2500,
      stock: 2,
    } as Product;

    const findOne = jest
      .fn()
      .mockResolvedValueOnce(order)
      .mockResolvedValueOnce(product);
    const save = jest.fn();

    const queryRunner = {
      manager: {
        findOne,
        save,
      },
    };

    await expect(
      service.createWithTransaction(
        {
          orderId: 1,
          productId: 2,
          quantity: 3,
        },
        queryRunner
      )
    ).rejects.toThrow(
      "Stock insuficiente para el producto Bota industrial. Disponible: 2, Solicitado: 3"
    );

    expect(save).not.toHaveBeenCalled();
  });
});
