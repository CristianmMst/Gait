import { PreferenceResponse } from "./types";
import { MERCADOPAGO_ACCESS_TOKEN } from "@/config";
import { OrderService } from "../orders/orderService";
import { PaymentStatus } from "../payments/paymentModel";
import { PaymentService } from "../payments/paymentService";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

export class MercadoPagoService {
  private client: MercadoPagoConfig;
  private orderService: OrderService;
  private paymentService: PaymentService;

  constructor() {
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      throw new Error("MERCADOPAGO_ACCESS_TOKEN is required");
    }
    this.client = new MercadoPagoConfig({
      accessToken: MERCADOPAGO_ACCESS_TOKEN,
    });
    this.orderService = new OrderService();
    this.paymentService = new PaymentService();
  }

  async createPreference(orderId: number): Promise<PreferenceResponse> {
    const order = await this.orderService.findById(orderId);

    if (!order) {
      throw new Error(`Orden con ID ${orderId} no encontrada`);
    }

    if (!order.orderProducts || order.orderProducts.length === 0) {
      throw new Error(
        `La orden con ID ${orderId} no tiene productos asociados`
      );
    }

    const items = order.orderProducts.map((orderProduct) => ({
      id: orderProduct.product.id.toString(),
      title: orderProduct.product.name,
      picture_url: orderProduct.product.image,
      quantity: orderProduct.quantity,
      unit_price: Number(orderProduct.product.price),
      currency_id: "COP",
    }));

    const preferenceData = {
      items,
      notification_url: `https://f8fe3047e0ba.ngrok-free.app/mercadopago/webhook`,
      external_reference: orderId.toString(),
      payment_methods: {
        installments: 6,
      },
    };

    const preference = new Preference(this.client);
    const result = await preference.create({ body: preferenceData });

    return {
      id: result.id!,
      init_point: result.init_point!,
      sandbox_init_point: result.sandbox_init_point!,
      date_created: result.date_created!,
    };
  }

  async getPaymentInfo(paymentId: string) {
    const payment = new Payment(this.client);
    const paymentInfo = await payment.get({ id: paymentId });
    return paymentInfo;
  }

  async processPaymentNotification(paymentId: string) {
    try {
      const paymentInfo = await this.getPaymentInfo(paymentId);

      console.log("Payment Info:", JSON.stringify(paymentInfo, null, 2));

      const orderId = parseInt(
        paymentInfo.external_reference?.toString() || "0"
      );

      if (!orderId) {
        throw new Error("No se encontró el external_reference en el pago");
      }

      const order = await this.orderService.findById(orderId);
      if (!order) {
        throw new Error(`Orden con ID ${orderId} no encontrada`);
      }

      let paymentStatus: PaymentStatus;
      switch (paymentInfo.status) {
        case "approved":
          paymentStatus = PaymentStatus.COMPLETED;
          break;
        case "rejected":
        case "cancelled":
          paymentStatus = PaymentStatus.FAILED;
          break;
        case "pending":
        case "in_process":
        case "in_mediation":
        default:
          paymentStatus = PaymentStatus.PENDING;
          break;
      }

      if (order.payments && order.payments.length > 0) {
        console.log(order);

        const payment = order.payments[0];

        await this.paymentService.updateStatus(payment.id, paymentStatus);
      }

      return {
        success: true,
        orderId,
        paymentStatus,
        mercadoPagoStatus: paymentInfo.status,
      };
    } catch (error) {
      console.error("Error procesando notificación de pago:", error);
      throw error;
    }
  }
}
