"use client";
import { Funnel, Search, ShoppingCart } from "lucide-react";
import { CartModal } from "./CartModal";
import { FilterModal } from "./FilterModal";
import { useCart } from "@/app/context/CartContext";
import { Category } from "../actions/getProducts";

interface SearchBarProps {
  categories: Category[];
}

export function SearchBar({ categories }: SearchBarProps) {
  const { items } = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.amount, 0);
  return (
    <div className="flex justify-between bg-zinc-950 border border-zinc-900 p-4 rounded-md">
      <div className="flex justify-between gap-x-2 bg-zinc-950 border border-zinc-900 p-2 rounded-md">
        <Search />
        <input
          type="text"
          className="outline-none"
          placeholder="Buscar productos..."
        />
      </div>
      <div className="flex gap-x-3 items-center">
        <div className="relative">
          <button
            type="button"
            popoverTarget="filter-popover"
            className="flex items-center gap-x-2 bg-zinc-800 p-2 rounded-md btn_filter_modal cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-slate-100"
          >
            <Funnel />
            <span>Filtros</span>
          </button>
          <FilterModal initialCategories={categories} />
        </div>
        <div className="relative">
          <button
            type="button"
            popoverTarget="cart-popover"
            className="flex items-center bg-zinc-800 p-2 px-3 rounded-md btn_cart_modal cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-slate-100"
          >
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </button>
          <CartModal />
        </div>
      </div>
    </div>
  );
}
