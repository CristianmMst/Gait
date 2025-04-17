"use server";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session =
  | {
      id?: number;
      name?: string;
      type?: string;
      role?: string;
      email?: string;
    }
  | undefined;

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const headers: HeadersInit = token ? { Authorization: token } : {};

  const response = await fetch("http://localhost:4000/auth/verify", {
    method: "GET",
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    return {};
  }

  const { user } = await response.json();
  return user;
}

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) redirect("/login");

  const user = session;
  return user;
});
