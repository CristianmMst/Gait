"use client";
import { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
  image: string;
  stock: number;
  description: string;
  category: {
    id: string;
    name: string;
  };
}

interface CartContextType {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [items, setItems] = useState<Product[]>([]);

  // Cargar items del localStorage al inicializar el componente
  useEffect(() => {
    const savedItems = localStorage.getItem("cart-items");
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error("Error parsing cart items from localStorage:", error);
        localStorage.removeItem("cart-items");
      }
    }
  }, []);

  // Guardar items en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, amount: i.amount + 1 } : i
        );
      }
      return [...prevItems, { ...item, amount: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === itemId) {
          if (item.amount > 1) {
            acc.push({ ...item, amount: item.amount - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as Product[])
    );
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
