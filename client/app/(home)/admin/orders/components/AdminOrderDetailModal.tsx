"use client";

import { Order } from "../../../orders/actions/getOrders";
import { formatPrice } from "@/lib/utils/formatPrice";
import Image from "next/image";
import { ReactElement } from "react";

interface AdminOrderDetailModalProps {
  order: Order;
  getStatusBadge: (status: "PENDING" | "COMPLETED" | "FAILED") => ReactElement;
  formatDate: (dateString: string) => string;
}

export function AdminOrderDetailModal({
  order,
  getStatusBadge,
  formatDate,
}: AdminOrderDetailModalProps) {
  const closeModal = () => {
    const popover = document.getElementById(
      `admin-order-modal-${order.id}`
    ) as HTMLElement & { hidePopover?: () => void };
    if (popover && popover.hidePopover) {
      popover.hidePopover();
    }
  };

  return (
    <div
      popover="auto"
      id={`admin-order-modal-${order.id}`}
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
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={40}
                          height={40}
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
                    <p className="text-sm text-gray-400">Monto Total</p>
                    <p className="text-2xl font-bold">
                      ${formatPrice(Number(order.payments[0].amount))}
                    </p>
                  </div>
                  {order.payments[0].paymentMethod && (
                    <div>
                      <p className="text-sm text-gray-400">Método de Pago</p>
                      <p className="text-lg font-semibold">
                        {order.payments[0].paymentMethod.name}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-x-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-2">
                      Estado del Pago
                    </p>
                    {getStatusBadge(order.payments[0].status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-zinc-950 border-t border-zinc-900 px-6 py-4 flex justify-end">
        <button
          onClick={closeModal}
          className="bg-zinc-950 border border-zinc-900 px-6 py-2 rounded-lg font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
