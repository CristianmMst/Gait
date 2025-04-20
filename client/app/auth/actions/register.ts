"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function register(_state: FormState, formData: FormData) {
  const headersList = await headers();
  const url = new URL(headersList.get("referer") || "");
  const token = url.searchParams.get("token");

  const response = await fetch(
    `http://localhost:4000/auth/register${token ? `?token=${token}` : ""}`,
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
      errors: data.message,
    };
  }

  redirect("/login");
}
