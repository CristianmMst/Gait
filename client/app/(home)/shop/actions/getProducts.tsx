import { config } from "@/lib/config";
import { Product } from "@/app/context/CartContext";

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
  const response = await fetch(
    `${config.serverUrl}/products?${
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

export async function getBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(`${config.serverUrl}/brands`);
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    return response.json();
  } catch (error) {
    console.warn("Using static brand data:", error);
    return [
      { id: 1, name: "TechCorp" },
      { id: 2, name: "AudioMax" },
      { id: 3, name: "GameTech" },
      { id: 4, name: "HealthTech" },
      { id: 5, name: "TabletCorp" },
      { id: 6, name: "PhotoPro" },
      { id: 7, name: "SmartHome" },
      { id: 8, name: "SportsPro" },
      { id: 9, name: "FashionTech" },
      { id: 10, name: "WellnessTech" },
    ];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${config.serverUrl}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  } catch (error) {
    console.warn("Using static category data:", error);
    return [
      { id: 1, name: "Electrónicos", description: "Dispositivos electrónicos" },
      { id: 2, name: "Audio", description: "Equipos de audio" },
      { id: 3, name: "Computadoras", description: "Equipos de cómputo" },
      { id: 4, name: "Wearables", description: "Dispositivos wearables" },
      { id: 5, name: "Tablets", description: "Tablets y accesorios" },
      { id: 6, name: "Fotografía", description: "Equipos de fotografía" },
      { id: 7, name: "Hogar", description: "Productos para el hogar" },
      { id: 8, name: "Deportes", description: "Artículos deportivos" },
      { id: 9, name: "Moda", description: "Productos de moda" },
      { id: 10, name: "Salud", description: "Productos de salud" },
    ];
  }
}
