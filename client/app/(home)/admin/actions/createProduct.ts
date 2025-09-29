import { config } from "@/lib/config";
import { FormState } from "@/lib/definitions";
import { AddProductSchema } from "@/lib/schemas/AddProductSchema";

export async function createProductAction(
  _state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = AddProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    discount: formData.get("discount"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    image: formData.get("image"),
    brandId: formData.get("brandId"),
    categoryId: formData.get("categoryId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    name,
    price,
    discount,
    description,
    stock,
    image,
    brandId,
    categoryId,
  } = validatedFields.data;

  try {
    const response = await fetch(`${config.serverUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        discount: discount ? Number(discount) : 0,
        description,
        stock: stock ? Number(stock) : 0,
        image: image || "",
        brandId,
        categoryId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || "Error al crear el producto",
      };
    }

    return {
      success: true,
      message: "Producto creado exitosamente",
    };
  } catch (error) {
    return {
      message: "Error de conexión. Intenta nuevamente.",
    };
  }
}
