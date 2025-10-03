"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { useState } from "react";
import { createOrder } from "../actions/createOrder";
import { formatPrice } from "@/lib/utils";

interface CartModalProps {
  userId: number;
  distributorId?: number;
}

export function CartModal({ userId, distributorId }: CartModalProps) {
  const { items, addItem, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAddMore = (item: (typeof items)[0]) => {
    return item.amount < item.stock;
  };

  const total = items.reduce((sum, item) => sum + item.price * item.amount, 0);

  const handleCreateOrder = async () => {
    if (items.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const products = items.map((item) => ({
        id: item.id,
        quantity: item.amount,
      }));

      const result = await createOrder(products, userId, distributorId);

      if (result.success) {
        clearCart();

        const popover = document.getElementById(
          "cart-popover"
        ) as HTMLElement & { hidePopover?: () => void };
        if (popover && popover.hidePopover) {
          popover.hidePopover();
        }

        window.location.reload();
      } else {
        setError(result.error || "Error al crear la orden");
      }
    } catch (err) {
      setError("Error inesperado al crear la orden");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      popover="auto"
      id="cart-popover"
      className="bg-zinc-900 border border-zinc-800 rounded-md p-4 min-h-64 min-w-96 origin-top-right"
    >
      <h2 className="text-white text-xl mb-2 font-black">Productos</h2>
      {items.length > 0 ? (
        <>
          <div className="max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-x-4 justify-between py-2 border-b border-zinc-700"
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
                <span className="text-slate-300">
                  ${formatPrice(item.price)}
                </span>
                <div className="flex items-center gap-x-3 border rounded-md px-2 py-1 border-zinc-700 hover:border-gray-800">
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
                    disabled={!canAddMore(item)}
                    className="text-accent text-xl px-2 rounded hover:bg-accent/10 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title={
                      !canAddMore(item)
                        ? "Stock máximo alcanzado"
                        : "Agregar uno más"
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white text-lg font-bold">Total:</span>
              <span className="text-white text-xl font-black">
                $
                {Math.round(total).toLocaleString("es-CO", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            {error && (
              <div className="mb-3 p-2 bg-red-900/30 border border-red-800 rounded-md text-red-200 text-sm">
                {error}
              </div>
            )}
            <button
              onClick={handleCreateOrder}
              disabled={loading || items.length === 0}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary/90 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creando orden..." : "Crear Orden"}
            </button>
          </div>
        </>
      ) : (
        <p className=" text-xl text-slate-200 text-center py-4">
          Carrito vacío
        </p>
      )}
    </div>
  );
}
