"use server";
import { config } from "@/lib/config";
import { cookies } from "next/headers";

export async function generateToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      errors: "No estás autenticado",
    };
  }

  const response = await fetch(`${config.serverUrl}/admin/generate_token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      errors: data.message,
    };
  }

  return data;
}
