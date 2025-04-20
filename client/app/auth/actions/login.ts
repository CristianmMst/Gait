import { redirect } from "next/navigation";
import { FormState } from "@/lib/definitions";
import { LoginSchema } from "@/lib/schemas/LoginSchema";

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

  const response = await fetch("http://localhost:4000/auth/login", {
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

  redirect("/");
}
