"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";

export function CartModal() {
  const { items, addItem, removeItem } = useCart();

  return (
    <div
      popover="auto"
      id="cart-popover"
      className="cart_modal bg-gray-700 rounded-md p-4 min-h-64 min-w-96 origin-top-right"
    >
      <h2 className="text-white text-xl mb-2">Productos</h2>
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-x-4 justify-between py-2 border-b border-gray-600"
          >
            <div className="flex items-center gap-2">
              <Image
                src={item.image}
                alt={item.name}
                width={40}
                height={40}
                className="rounded"
              />
              <span
                className="font-semibold text-slate-200 max-w-[160px] truncate block"
                title={item.name}
              >
                {item.name}
              </span>
            </div>
            <span className="text-slate-300">${item.price}</span>
            <div className="flex items-center gap-x-3 border rounded-md px-2 py-1 border-gray-500 hover:border-gray-800">
              <button
                onClick={() => removeItem(item.id)}
                className="text-white text-xl px-2 rounded cursor-pointer"
              >
                -
              </button>
              <span className="text-slate-200 font-bold text-center min-w-5">
                {item.amount}
              </span>
              <button
                onClick={() => addItem(item)}
                className="text-accent text-xl px-2 rounded hover:bg-accent/10 transition-colors duration-300 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className=" text-xl text-slate-200 text-center py-4">
          Carrito vacío
        </p>
      )}
    </div>
  );
}
