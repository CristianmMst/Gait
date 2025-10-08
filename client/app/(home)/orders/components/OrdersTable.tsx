"use client";

import { Order } from "../actions/getOrders";
import { CreditCard, Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { OrderDetailModal } from "./OrderDetailModal";
import {
  PaymentState,
  createPaymentPreference,
} from "../actions/createPayment";
import { useActionState, useEffect, useRef } from "react";

interface OrdersTableProps {
  orders: Order[];
  canPay: boolean;
}

const initialState: PaymentState = {
  success: false,
};

export function OrdersTable({ orders, canPay }: OrdersTableProps) {
  const [state, formAction, isPending] = useActionState(
    createPaymentPreference,
    initialState
  );
  const currentOrderIdRef = useRef<number | null>(null);

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

  useEffect(() => {
    if (state.success && state.paymentUrl) {
      // Abrir el link de pago en una nueva ventana
      window.open(state.paymentUrl, "_blank", "noopener,noreferrer");
      currentOrderIdRef.current = null;
    } else if (state.error) {
      console.error("Error al crear preferencia:", state.error);
      currentOrderIdRef.current = null;
    }
  }, [state]);

  if (orders.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 rounded-lg shadow-md p-8 text-center">
        <p className="text-white text-lg">No tienes órdenes registradas</p>
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
                    ${formatPrice(Number(order.total))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.payments && order.payments.length > 0
                      ? getStatusBadge(order.payments[0].status)
                      : getStatusBadge("PENDING")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-x-6">
                      <button
                        type="button"
                        popoverTarget={`order-modal-${order.id}`}
                        className="flex items-center gap-x-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        <Eye />
                        Ver
                      </button>
                      {canPay &&
                        order.payments &&
                        order.payments.length > 0 &&
                        (order.payments[0].status === "PENDING" ||
                          order.payments[0].status === "FAILED") && (
                          <form
                            action={formAction}
                            onSubmit={() => {
                              currentOrderIdRef.current = order.id;
                            }}
                          >
                            <input
                              type="hidden"
                              name="orderId"
                              value={order.id}
                            />
                            <button
                              type="submit"
                              disabled={
                                isPending &&
                                currentOrderIdRef.current === order.id
                              }
                              className={`flex items-center gap-x-2 font-semibold transition-colors p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${
                                order.payments[0].status === "FAILED"
                                  ? "bg-orange-400 text-orange-950 hover:bg-orange-500"
                                  : "bg-green-400 text-green-950 hover:bg-green-500"
                              }`}
                            >
                              <CreditCard />
                              {isPending &&
                              currentOrderIdRef.current === order.id
                                ? "Procesando..."
                                : order.payments[0].status === "FAILED"
                                ? "Reintentar"
                                : "Pagar"}
                            </button>
                          </form>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {orders.map((order) => (
        <OrderDetailModal
          key={`modal-${order.id}`}
          order={order}
          canPay={canPay}
          getStatusBadge={getStatusBadge}
          formatDate={formatDate}
        />
      ))}
    </>
  );
}
