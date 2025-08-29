import { Product } from "@/app/context/CartContext";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:4000/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
