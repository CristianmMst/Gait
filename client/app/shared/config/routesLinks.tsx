import { Store, Truck, Folders, LayoutDashboard } from "lucide-react";

export enum Role {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  VIEWER = "VIEWER",
}

interface Route {
  name: string;
  path: string;
  roles: Role[];
  icon: React.ReactNode;
}

export const routes: Route[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard />,
    roles: [Role.ADMIN, Role.MODERATOR, Role.VIEWER],
  },
  {
    name: "Tienda",
    path: "/shop",
    icon: <Store />,
    roles: [Role.ADMIN, Role.MODERATOR],
  },
  {
    name: "Historial de pedidos",
    path: "/orders",
    icon: <Folders />,
    roles: [Role.ADMIN, Role.MODERATOR, Role.VIEWER],
  },
  {
    name: "Estado de pedido",
    path: "/order",
    icon: <Truck />,
    roles: [Role.ADMIN, Role.MODERATOR, Role.VIEWER],
  },
];
