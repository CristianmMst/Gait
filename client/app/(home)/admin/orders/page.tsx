import { getUser } from "@/app/(auth)/actions/verifySession";
import { ROLE } from "@/app/shared/enums/user";
import { redirect } from "next/navigation";
import { AdminOrdersTable } from "./components/AdminOrdersTable";
import { getOrders, Order } from "../../orders/actions/getOrders";

export default async function AdminOrdersPage() {
  const user = await getUser();

  if (user.role !== ROLE.ADMIN) {
    redirect("/");
  }

  const orders: Order[] = await getOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Todas las Órdenes del Sistema
        </h1>
        <p>
          Gestiona y visualiza todas las órdenes de todos los distribuidores
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Total de órdenes:{" "}
          <span className="font-semibold">{orders.length}</span>
        </p>
      </div>

      <AdminOrdersTable orders={orders} />
    </div>
  );
}
