"use server";
import { config } from "@/lib/config";
import { cookies } from "next/headers";

interface CreateOrderProduct {
  id: number;
  quantity: number;
}

interface CreateOrderRequest {
  employeeId: number;
  distributorId: number;
  orderDate: string;
  dispatchDate?: string;
  deliveryDate?: string;
  products: CreateOrderProduct[];
}

interface CreateOrderResponse {
  message: string;
  order: {
    id: number;
    total: number;
    order_date: string;
    dispatch_date?: string;
    delivery_date?: string;
    employee: {
      id: number;
      name: string;
      lastname: string;
    };
    distributor: {
      id: number;
      name: string;
    };
    orderProducts: Array<{
      id: number;
      quantity: number;
      subtotal: number;
      product: {
        id: number;
        name: string;
        price: number;
      };
    }>;
    payments: Array<{
      id: number;
      amount: number;
      status: string;
      paymentMethod: string | null;
    }>;
  };
}

export async function createOrder(
  products: CreateOrderProduct[],
  employeeId: number,
  distributorId?: number
): Promise<{ success: boolean; data?: CreateOrderResponse; error?: string }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, error: "No autenticado" };
    }

    // Generar fechas
    const orderDate = new Date().toISOString();
    const dispatchDate = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ).toISOString(); // +1 día
    const deliveryDate = new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000
    ).toISOString(); // +3 días

    const orderData: CreateOrderRequest = {
      employeeId,
      distributorId: distributorId || employeeId,
      orderDate,
      dispatchDate,
      deliveryDate,
      products,
    };

    const response = await fetch(`${config.serverUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || "Error al crear la orden",
      };
    }

    const data: CreateOrderResponse = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: "Error de conexión al crear la orden",
    };
  }
}
