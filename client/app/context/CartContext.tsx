"use client";
import { createContext, useContext, useState } from "react";

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
