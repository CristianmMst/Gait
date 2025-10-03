import { OrderService } from "./orderService";
import { Request, Response, NextFunction } from "express";

export class OrderController {
  private orderService = new OrderService();

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        employeeId,
        distributorId,
        orderDate,
        dispatchDate,
        deliveryDate,
        products,
      } = req.body;

      if (
        !employeeId ||
        !distributorId ||
        !orderDate ||
        !dispatchDate ||
        !deliveryDate
      ) {
        return res.status(400).json({
          message:
            "Los campos employeeId, distributorId, orderDate, dispatchDate y deliveryDate son requeridos",
        });
      }

      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
          message: "Debe incluir al menos un producto en la orden",
        });
      }

      for (const product of products) {
        if (!product.id || !product.quantity) {
          return res.status(400).json({
            message: "Cada producto debe tener id y quantity",
          });
        }

        if (product.quantity <= 0) {
          return res.status(400).json({
            message: "La cantidad debe ser mayor a 0",
          });
        }
      }

      const orderData = {
        employeeId: Number(employeeId),
        distributorId: Number(distributorId),
        orderDate: new Date(orderDate),
        dispatchDate: new Date(dispatchDate),
        deliveryDate: new Date(deliveryDate),
        products: products.map((p: any) => ({
          id: Number(p.id),
          quantity: Number(p.quantity),
        })),
      };

      const newOrder = await this.orderService.create(orderData);

      res.status(201).json({
        message: "Orden creada exitosamente",
        order: newOrder,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes("no encontrado") ||
          error.message.includes("Stock insuficiente")
        ) {
          return res.status(400).json({
            message: error.message,
          });
        }
      }
      next(error);
    }
  };

  getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId, distributorId, startDate, endDate } = req.query;

      const orders = await this.orderService.getAll({
        employeeId: employeeId ? Number(employeeId) : undefined,
        distributorId: distributorId ? Number(distributorId) : undefined,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
      });

      res.json(orders);
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          message: "ID de orden inválido",
        });
      }

      const order = await this.orderService.findById(Number(id));

      if (!order) {
        return res.status(404).json({
          message: "Orden no encontrada",
        });
      }

      res.json(order);
    } catch (error) {
      next(error);
    }
  };

  getOrdersByDistributor = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { distributorId } = req.params;

      if (!distributorId || isNaN(Number(distributorId))) {
        return res.status(400).json({
          message: "ID de distribuidor inválido",
        });
      }

      const orders = await this.orderService.getByDistributor(
        Number(distributorId)
      );

      res.json(orders);
    } catch (error) {
      next(error);
    }
  };

  getOrdersByEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { employeeId } = req.params;

      if (!employeeId || isNaN(Number(employeeId))) {
        return res.status(400).json({
          message: "ID de empleado inválido",
        });
      }

      const orders = await this.orderService.getByEmployee(Number(employeeId));

      res.json(orders);
    } catch (error) {
      next(error);
    }
  };

  deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({
          message: "ID de orden inválido",
        });
      }

      const orderId = Number(id);

      const existingOrder = await this.orderService.findById(orderId);
      if (!existingOrder) {
        return res.status(404).json({
          message: "Orden no encontrada",
        });
      }

      const deleted = await this.orderService.delete(orderId);

      if (!deleted) {
        return res.status(500).json({
          message: "Error al eliminar la orden",
        });
      }

      res.status(200).json({
        message: "Orden eliminada exitosamente",
      });
    } catch (error) {
      next(error);
    }
  };
}
