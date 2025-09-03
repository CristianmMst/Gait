import { Product } from "@/app/context/CartContext";

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`http://localhost:4000/products/${id}`);
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
  const response = await fetch(
    `http://localhost:4000/products?${
      categoryId ? `categoryId=${categoryId}&` : ""
    }${minPrice ? `minPrice=${minPrice}&` : ""}${
      maxPrice ? `maxPrice=${maxPrice}` : ""
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
