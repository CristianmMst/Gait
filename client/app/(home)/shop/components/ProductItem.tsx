"use client";
import Image from "next/image";
import { Product, useCart } from "@/app/context/CartContext";

export function ProductItem({ product }: { product: Product }) {
  const { items, addItem, removeItem } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  return (
    <div
      key={product.id}
      className="flex flex-col gap-y-2 bg-gray-900 rounded-md p-6 py-6 h-full min-h-[320px]"
    >
      <Image
        width={150}
        height={150}
        alt={product.name}
        src={product.image}
        className="self-center"
      />
      <h2
        className="w-full max-w-[180px] break-words font-semibold text-slate-200 mt-2"
        title={product.name}
      >
        {product.name}
      </h2>
      <p className="text-sm text-slate-400">{product.category.name}</p>
      {/* <p
        className="w-full max-w-[160px] text-center break-words text-slate-400"
        title={product.description}
      >
        {product.description}
      </p> */}
      <p className="font-semibold text-lg rounded shadow mb-2 mt-auto w-fit">
        ${" "}
        {Math.round(product.price).toLocaleString("es-CO", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </p>
      <div className="flex items-center justify-center mt-auto self-center min-h-[48px] w-full">
        {cartItem ? (
          <div className="flex items-center gap-x-3 border rounded-md px-2 py-1 border-gray-500 hover:border-gray-800 w-full max-w-[200px] justify-center">
            <button
              onClick={() => removeItem(product.id)}
              className="text-white text-xl px-2 rounded cursor-pointer"
            >
              -
            </button>
            <span className="text-slate-200 font-bold text-center min-w-5">
              {cartItem.amount}
            </span>
            <button
              onClick={() => addItem(product)}
              className="text-accent text-xl px-2 rounded hover:bg-accent/10 transition-colors duration-300 cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addItem(product)}
            type="button"
            className="text-lg bg-primary px-3 py-1 rounded-full shadow w-full max-w-[200px] cursor-pointer hover:bg-primary/80 transition-colors duration-300"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}
