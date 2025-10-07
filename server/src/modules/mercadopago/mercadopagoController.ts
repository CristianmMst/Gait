import { Request, Response, NextFunction } from "express";
import { MercadoPagoService } from "./mercadopagoService";

export class MercadoPagoController {
  private mercadopagoService = new MercadoPagoService();

  createPreference = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { orderId } = req.body;

      if (!orderId) {
        throw new Error("Order ID is required");
      }

      const orderIdNumber = parseInt(orderId, 10);

      if (isNaN(orderIdNumber)) {
        throw new Error("Order ID must be a valid number");
      }

      const preference = await this.mercadopagoService.createPreference(
        orderIdNumber
      );

      res.status(201).json({
        success: true,
        data: preference,
      });
    } catch (error) {
      next(error);
    }
  };

  webhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type, data } = req.body;

      if (type === "payment") {
        const paymentId = data.id;

        if (!paymentId) {
          throw new Error("Payment ID is required");
        }

        const result = await this.mercadopagoService.processPaymentNotification(
          paymentId
        );

        return res.status(200).json({
          success: true,
          message: "Webhook procesado correctamente",
          data: result,
        });
      }

      res.status(200).json({
        success: true,
        message: "Webhook recibido",
      });
    } catch (error) {
      console.error("Error en webhook:", error);
      res.status(200).json({
        success: false,
        message: "Error procesando webhook",
      });
    }
  };
}
