"use client";

import { Order } from "../actions/getOrders";
import { formatPrice } from "@/lib/utils/formatPrice";
import Link from "next/link";
import { ReactElement, useActionState, useEffect, useRef } from "react";
import {
  createPaymentPreference,
  PaymentState,
} from "../actions/createPayment";

interface OrderDetailModalProps {
  order: Order;
  canPay: boolean;
  getStatusBadge: (status: "PENDING" | "COMPLETED" | "FAILED") => ReactElement;
  formatDate: (dateString: string) => string;
}

const initialState: PaymentState = {
  success: false,
};

export function OrderDetailModal({
  order,
  canPay,
  getStatusBadge,
  formatDate,
}: OrderDetailModalProps) {
  const [state, formAction, isPending] = useActionState(
    createPaymentPreference,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  const closeModal = () => {
    const popover = document.getElementById(
      `order-modal-${order.id}`
    ) as HTMLElement & { hidePopover?: () => void };
    if (popover && popover.hidePopover) {
      popover.hidePopover();
    }
  };

  useEffect(() => {
    if (state.success && state.paymentUrl) {
      // Abrir el link de pago en una nueva ventana
      window.open(state.paymentUrl, "_blank", "noopener,noreferrer");
      closeModal();
    } else if (state.error) {
      console.error("Error al crear preferencia:", state.error);
    }
  }, [state]);

  return (
    <div
      popover="auto"
      id={`order-modal-${order.id}`}
      className="popover bg-zinc-950 text-white m-auto rounded-lg shadow-xl max-w-5xl w-full backdrop:bg-black backdrop:bg-opacity-50"
    >
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
        <div>
          <h2 className="text-2xl font-bold">Orden #{order.id}</h2>
          <p className="text-sm tracking-wide">Fecha de Orden</p>
          <p className="font-medium">{formatDate(order.order_date)}</p>
        </div>
        <button
          onClick={closeModal}
          className="text-3xl font-bold leading-none transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-500 p-4 rounded-lg border border-blue-400">
            <h4 className="font-semibold mb-2">Distribuidor</h4>
            <p className="font-bold text-lg">{order.distributor.name}</p>
            <p className="text-sm mt-1">{order.distributor.email}</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg border border-purple-600">
            <h4 className="font-semibold mb-2">Empleado</h4>
            <p className="font-bold text-lg">
              {order.employee.name} {order.employee.lastname}
            </p>
            <p className="text-sm mt-1">{order.employee.email}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Productos de la Orden</h3>
          <div className="overflow-x-auto border border-zinc-900 rounded-lg shadow-sm max-h-[300px] overflow-auto">
            <table className="min-w-full divide-y divide-zinc-900">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase">
                    Producto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase">
                    Marca
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase">
                    Categoría
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase">
                    Cantidad
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase">
                    Precio Unit.
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {order.orderProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900">
                    <td className="px-4 py-3 text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span>{item.product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.product.brand?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.product.category?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-semibold">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      ${formatPrice(Number(item.product.price))}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-right">
                      ${formatPrice(Number(item.subtotal))}
                    </td>
                  </tr>
                ))}
                <tr className="bg-zinc-950">
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-right text-sm font-bold"
                  >
                    Total de la Orden:
                  </td>
                  <td className="px-4 py-4 text-right text-lg font-bold">
                    ${formatPrice(Number(order.total))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {order.payments && order.payments.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Información de Pago</h3>
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-lg border border-zinc-900 p-6 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div>
                    <p className="text-xl font-bold">Monto Total</p>
                    <p className="text-xl font-bold">
                      $ {formatPrice(Number(order.payments[0].amount))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-6">
                  {getStatusBadge(order.payments[0].status)}
                  {canPay &&
                    (order.payments[0].status === "PENDING" ||
                      order.payments[0].status === "FAILED") && (
                      <form ref={formRef} action={formAction}>
                        <input type="hidden" name="orderId" value={order.id} />
                        <button
                          type="submit"
                          disabled={isPending}
                          className={`px-6 py-2 rounded-lg font-semibold transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
                            order.payments[0].status === "FAILED"
                              ? "bg-orange-600 text-white hover:bg-orange-700"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {isPending
                            ? "Procesando..."
                            : order.payments[0].status === "FAILED"
                            ? "Reintentar Pago"
                            : "Proceder al Pago"}
                        </button>
                      </form>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-zinc-950 border-t border-zinc-900 px-6 py-4 flex justify-end">
        <button
          onClick={closeModal}
          className="bg-zinc-950 border border-zinc-900  px-6 py-2 rounded-lg font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
