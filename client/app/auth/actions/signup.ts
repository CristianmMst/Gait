"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FormState } from "@/lib/definitions";
import { SignupStepTwoSchema } from "@/lib/schemas/SignupSchema";

export async function signup(_state: FormState, formData: FormData) {
  const headersList = await headers();
  const url = new URL(headersList.get("referer") || "");
  const token = url.searchParams.get("token");

  const validatedFields = SignupStepTwoSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `http://localhost:4000/auth/signup${token ? `?token=${token}` : ""}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formData.get("nit"),
        name: formData.get("name"),
        location: formData.get("location"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      message: data.message,
    };
  }

  redirect("/login");
}
