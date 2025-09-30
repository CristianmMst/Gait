import { config } from "@/lib/config";
import { Product } from "@/app/context/CartContext";
import { cache } from "react";

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${config.serverUrl}/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
}

export async function getProducts(
  categoryId?: string,
  minPrice?: number,
  maxPrice?: number
): Promise<Product[]> {
  const cacheOption =
    !categoryId && !minPrice && !maxPrice
      ? { next: { revalidate: 300 } }
      : { cache: "no-store" as const };

  const response = await fetch(
    `${config.serverUrl}/products?${
      categoryId ? `categoryId=${categoryId}&` : ""
    }${minPrice ? `minPrice=${minPrice}&` : ""}${
      maxPrice ? `maxPrice=${maxPrice}` : ""
    }`,
    cacheOption
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

export const getBrands = cache(async (): Promise<Brand[]> => {
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
});

export const getCategories = cache(async (): Promise<Category[]> => {
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
});
