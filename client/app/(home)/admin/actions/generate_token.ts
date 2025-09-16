import { config } from "@/lib/config";

export async function generateToken() {
  const response = await fetch(`${config.serverUrl}/admin/generate_token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      errors: data.message,
    };
  }

  return data;
}
