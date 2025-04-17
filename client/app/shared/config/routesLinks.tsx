import { Store, Truck, Folders, LayoutDashboard, KeyRound } from "lucide-react";

export enum TYPE_USERS {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
  DISTRIBUTOR = "DISTRIBUTOR",
}

export enum ROLE {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  VIEWER = "VIEWER",
}

interface Route {
  name: string;
  path: string;
  roles: ROLE[];
  types: TYPE_USERS[];
  icon: React.ReactNode;
}

export const routesAdmin: Route[] = [
  {
    name: "Registar distribuidor",
    path: "/admin/register_distributor",
    icon: <KeyRound />,
    types: [TYPE_USERS.ADMIN],
    roles: [ROLE.ADMIN],
  },
];

export const routes: Route[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
    types: [TYPE_USERS.ADMIN, TYPE_USERS.DISTRIBUTOR, TYPE_USERS.EMPLOYEE],
    roles: [ROLE.ADMIN, ROLE.MODERATOR, ROLE.VIEWER],
  },
  {
    name: "Tienda",
    path: "/shop",
    icon: <Store />,
    types: [TYPE_USERS.ADMIN, TYPE_USERS.DISTRIBUTOR, TYPE_USERS.EMPLOYEE],
    roles: [ROLE.ADMIN, ROLE.MODERATOR],
  },
  {
    name: "Historial de pedidos",
    path: "/orders",
    icon: <Folders />,
    types: [TYPE_USERS.EMPLOYEE, TYPE_USERS.DISTRIBUTOR],
    roles: [ROLE.ADMIN, ROLE.MODERATOR, ROLE.VIEWER],
  },
  {
    name: "Estado de pedido",
    path: "/order",
    icon: <Truck />,
    types: [TYPE_USERS.EMPLOYEE, TYPE_USERS.DISTRIBUTOR],
    roles: [ROLE.ADMIN, ROLE.MODERATOR, ROLE.VIEWER],
  },
];
