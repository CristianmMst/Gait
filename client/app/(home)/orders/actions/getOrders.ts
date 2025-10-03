"use server";

import { config } from "@/lib/config";
import { cookies } from "next/headers";

export interface OrderProduct {
  id: number;
  quantity: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: {
      id: number;
      name: string;
    };
    category: {
      id: number;
      name: string;
    };
  };
}

export interface Payment {
  id: number;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED";
  paymentMethod: {
    id: number;
    name: string;
  } | null;
}

export interface Order {
  id: number;
  total: number;
  order_date: string;
  dispatch_date: string;
  delivery_date: string;
  employee: {
    id: number;
    name: string;
    lastname: string;
    email: string;
  };
  distributor: {
    id: number;
    email: string;
    name: string;
  };
  orderProducts: OrderProduct[];
  payments: Payment[];
}

export async function getOrders(): Promise<Order[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const headers: HeadersInit = token
    ? { Authorization: token, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };

  try {
    const response = await fetch(`${config.serverUrl}/orders`, {
      method: "GET",
      headers,
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Error al obtener las órdenes");
    }

    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export async function getOrdersByDistributor(
  distributorId: number
): Promise<Order[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const headers: HeadersInit = token
    ? { Authorization: token, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };

  try {
    const response = await fetch(
      `${config.serverUrl}/orders/distributor/${distributorId}`,
      {
        method: "GET",
        headers,
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las órdenes del distribuidor");
    }

    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("Error fetching distributor orders:", error);
    return [];
  }
}

export async function getOrdersByEmployee(
  employeeId: number
): Promise<Order[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const headers: HeadersInit = token
    ? { Authorization: token, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };

  try {
    const response = await fetch(
      `${config.serverUrl}/orders/employee/${employeeId}`,
      {
        method: "GET",
        headers,
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las órdenes del empleado");
    }

    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("Error fetching employee orders:", error);
    return [];
  }
}
