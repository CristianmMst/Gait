"use client";

import { Order } from "../../../orders/actions/getOrders";
import { formatPrice } from "@/lib/utils/formatPrice";
import { Eye } from "lucide-react";
import { AdminOrderDetailModal } from "./AdminOrderDetailModal";

interface AdminOrdersTableProps {
  orders: Order[];
}

export function AdminOrdersTable({ orders }: AdminOrdersTableProps) {
  const getStatusBadge = (status: "PENDING" | "COMPLETED" | "FAILED") => {
    const styles = {
      PENDING: "bg-yellow-500 text-yellow-950",
      COMPLETED: "bg-green-500 text-green-950",
      FAILED: "bg-red-500 text-red-950",
    };

    const labels = {
      PENDING: "Pendiente",
      COMPLETED: "Completado",
      FAILED: "Fallido",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (orders.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 rounded-lg shadow-md p-8 text-center">
        <p className="text-white text-lg">
          No hay órdenes registradas en el sistema
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-zinc-950 border border-zinc-900 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-900">
            <thead className="bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Fecha de Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Distribuidor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Empleado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Estado de Pago
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-950 divide-y divide-zinc-900">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-zinc-900 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {formatDate(order.order_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {order.distributor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {order.employee.name} {order.employee.lastname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    {formatPrice(Number(order.total))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.payments && order.payments.length > 0
                      ? getStatusBadge(order.payments[0].status)
                      : getStatusBadge("PENDING")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      type="button"
                      popoverTarget={`admin-order-modal-${order.id}`}
                      className="flex items-center gap-x-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <Eye />
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {orders.map((order) => (
        <AdminOrderDetailModal
          key={`modal-${order.id}`}
          order={order}
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
        />
      ))}
    </>
  );
}
