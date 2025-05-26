import { ROLE, TYPE_USERS } from "../enums/user";
import { House, Store, Truck, Folders, KeyRound, UserPlus } from "lucide-react";

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
    path: "/admin/signup_distributor",
    icon: <KeyRound />,
    types: [TYPE_USERS.ADMIN],
    roles: [ROLE.ADMIN],
  },
];

export const routes: Route[] = [
  {
    name: "Inicio",
    path: "/",
    icon: <House />,
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
  {
    name: "Registar empleado",
    path: "/distributor/add_employee",
    icon: <UserPlus />,
    roles: [ROLE.ADMIN],
    types: [TYPE_USERS.DISTRIBUTOR],
  },
];
