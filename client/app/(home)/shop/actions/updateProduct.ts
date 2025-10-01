"use server";

import { config } from "@/lib/config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type ActionState =
  | {
      success: boolean;
      message: string;
    }
  | undefined;

export async function updateProductAction(
  productId: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      message: "No estás autenticado",
    };
  }

  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const discount = formData.get("discount") as string;
  const description = formData.get("description") as string;
  const stock = formData.get("stock") as string;
  const image = formData.get("image") as string;
  const brandId = formData.get("brandId") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!name || !price || !brandId || !categoryId) {
    return {
      success: false,
      message: "Los campos nombre, precio, marca y categoría son requeridos",
    };
  }

  const productData = {
    name,
    price: parseFloat(price),
    discount: discount ? parseFloat(discount) : 0,
    description: description || "",
    stock: stock ? parseInt(stock, 10) : 0,
    image: image || "",
    brandId: parseInt(brandId, 10),
    categoryId: parseInt(categoryId, 10),
  };

  try {
    const response = await fetch(`${config.serverUrl}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${token}`,
      },
      credentials: "include",
      body: JSON.stringify(productData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Error al actualizar el producto",
      };
    }

    revalidatePath("/shop");
    revalidatePath("/shop/[id]", "page");
    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Producto actualizado exitosamente",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error de conexión. Intenta nuevamente.",
    };
  }
}
