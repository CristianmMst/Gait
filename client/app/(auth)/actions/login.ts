import { config } from "@/lib/config";
import { redirect } from "next/navigation";
import { FormState } from "@/lib/definitions";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { cookies } from "next/headers";

export async function login(_state: FormState, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${config.serverUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      message: data.message,
    };
  }

  // Guardar el token en una cookie del lado del servidor de Next.js
  // Esto funciona tanto en local como en producción con Vercel
  const cookieStore = await cookies();
  cookieStore.set("accessToken", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: "/",
  });

  redirect("/");
}
