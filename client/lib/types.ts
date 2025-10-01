/**
 * Tipos centralizados para la aplicación
 * Todos los tipos relacionados con productos, marcas, categorías, etc.
 */

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  description: string;
  discount?: number;
  brand: Brand;
  category: Category;
}

/**
 * Tipo para productos en el carrito
 * Extiende Product y agrega la cantidad de items en el carrito
 */
export interface CartProduct extends Product {
  amount: number; // cantidad de este producto en el carrito
}
