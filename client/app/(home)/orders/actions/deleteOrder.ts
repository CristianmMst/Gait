"use server";

import { config } from "@/lib/config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteOrder(orderId: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        error: "No se encontró el token de autenticación",
      };
    }

    const response = await fetch(`${config.serverUrl}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Error al eliminar la orden",
      };
    }

    const data = await response.json();

    revalidatePath("/orders");

    return {
      success: true,
      message: data.message || "Orden eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
    return {
      success: false,
      error: "Error al eliminar la orden. Por favor, inténtelo de nuevo.",
    };
  }
}
