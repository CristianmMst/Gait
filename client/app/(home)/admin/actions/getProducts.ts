"use server";

import { config } from "@/lib/config";
import { Product } from "@/lib/types";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${config.serverUrl}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
