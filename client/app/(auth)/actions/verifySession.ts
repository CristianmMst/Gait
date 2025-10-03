"use server";
import { cache } from "react";
import { config } from "@/lib/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROLE, TYPE_USERS } from "@/app/shared/enums/user";

export type Session = {
  id: number;
  name: string;
  role: ROLE;
  type: TYPE_USERS;
  email: string;
} | null;

export async function verifySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const headers: HeadersInit = token ? { Authorization: token } : {};

  const response = await fetch(`${config.serverUrl}/auth/verify`, {
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
