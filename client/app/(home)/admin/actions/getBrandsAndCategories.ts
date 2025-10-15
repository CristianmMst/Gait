"use server";

import { config } from "@/lib/config";
import { Brand, Category } from "@/lib/types";

export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(`${config.serverUrl}/brands`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${config.serverUrl}/categories`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
