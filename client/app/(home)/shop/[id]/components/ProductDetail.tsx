"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CircleCheckBig, CircleX, ShoppingCart } from "lucide-react";
import { Product, useCart } from "@/app/context/CartContext";

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="p-8">
      <Link href="/shop" className="flex items-center gap-x-2">
        <ArrowLeft />
        <span>Volver a la tienda</span>
      </Link>
      <div className="flex gap-x-8 mt-6">
        <Image
          width={400}
          height={400}
          alt={product.name}
          src={product.image}
          className="bg-slate-700 rounded-md"
        />
        <div className="flex flex-col gap-y-4 min-w-[300px]">
          <p className="text-sm font-semibold text-secondary">
            {product.category.name}
          </p>
          <h3 className="text-4xl font-black">{product.name}</h3>
          <p className="text-2xl font-semibold">
            ${" "}
            {Math.round(product.price).toLocaleString("es-CO", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          {/* <p>{product.description}</p> */}
          <div className="flex flex-col gap-y-2 mt-4">
            <div className="flex items-center gap-x-4">
              <span>Cantidad: </span>
              <div className="flex items-center gap-x-3 border rounded-md px-2 py-1 border-gray-500 hover:border-gray-800 justify-center">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-white text-xl px-2 rounded cursor-pointer"
                  type="button"
                  aria-label="Restar cantidad"
                >
                  -
                </button>
                <span className="text-slate-200 font-bold text-center min-w-5">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-accent text-xl px-2 rounded hover:bg-accent/10 transition-colors duration-300 cursor-pointer"
                  type="button"
                  aria-label="Sumar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            {product.stock > 0 ? (
              <p className="flex mt-2 gap-x-2 items-center text-green-500">
                <CircleCheckBig size={20} />
                <span>{product.stock > 0 ? "En stock" : "Agotado"}</span>
              </p>
            ) : (
              <p className="flex mt-2 gap-x-2 items-center text-red-500">
                <CircleX size={20} />
                <span>Agotado</span>
              </p>
            )}

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex gap-x-4 items-center self-start mt-4 text-lg bg-primary px-4 py-2 rounded-md shadow cursor-pointer hover:bg-primary/80 transition-colors duration-300"
            >
              <ShoppingCart size={25} />
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
