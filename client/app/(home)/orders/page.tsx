import { getUser } from "@/app/(auth)/actions/verifySession";
import { ROLE, TYPE_USERS } from "@/app/shared/enums/user";
import { OrdersTable } from "./components/OrdersTable";
import { getOrdersByDistributor, Order } from "./actions/getOrders";

export default async function OrdersPage() {
  const user = await getUser();

  const distributorId =
    user.type === TYPE_USERS.DISTRIBUTOR ? user.id : user.distributorId;

  let orders: Order[] = await getOrdersByDistributor(distributorId);

  const canPay =
    user.type === TYPE_USERS.DISTRIBUTOR ||
    user.role === ROLE.ADMIN ||
    (user.type == TYPE_USERS.EMPLOYEE && user.role !== ROLE.ADMIN);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mis Órdenes</h1>
        <p>Gestiona y visualiza todas tus órdenes</p>
        <p className="text-sm text-gray-400 mt-2">
          Total de órdenes:{" "}
          <span className="font-semibold">{orders.length}</span>
        </p>
      </div>

      <OrdersTable orders={orders} canPay={canPay} />
    </div>
  );
}
