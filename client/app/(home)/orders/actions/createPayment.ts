"use server";

import { config } from "@/lib/config";
import { cookies } from "next/headers";

interface MercadoPagoPreferenceResponse {
  success: boolean;
  data: {
    id: string;
    init_point: string;
    sandbox_init_point: string;
    date_created: string;
  };
}

export interface PaymentState {
  success: boolean;
  paymentUrl?: string;
  sandboxPaymentUrl?: string;
  error?: string;
}

export async function createPaymentPreference(
  prevState: PaymentState | null,
  formData: FormData
): Promise<PaymentState> {
  try {
    const orderId = formData.get("orderId");

    if (!orderId) {
      return {
        success: false,
        error: "ID de orden es requerido",
      };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        error: "No autorizado",
      };
    }

    const response = await fetch(`${config.serverUrl}/mercadopago/preference`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ orderId: Number(orderId) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Error al crear la preferencia de pago",
      };
    }

    const data: MercadoPagoPreferenceResponse = await response.json();
    return {
      success: true,
      paymentUrl: data.data.init_point,
      sandboxPaymentUrl: data.data.sandbox_init_point,
    };
  } catch (error) {
    console.error("Error en createPaymentPreference:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
