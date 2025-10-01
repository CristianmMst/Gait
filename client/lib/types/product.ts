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

export interface CartProduct extends Product {
  amount: number;
}
