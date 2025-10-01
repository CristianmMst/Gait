"use server";

import { config } from "@/lib/config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProductAction(productId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      message: "No estás autenticado",
    };
  }

  try {
    const response = await fetch(`${config.serverUrl}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Error al eliminar el producto",
      };
    }

    revalidatePath("/shop");
    revalidatePath("/shop/[id]", "page");
    revalidatePath("/", "layout");
  } catch (error) {
    return {
      success: false,
      message: "Error de conexión. Intenta nuevamente.",
    };
  }

  redirect("/shop");
}
