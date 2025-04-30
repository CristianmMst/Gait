"use client";
import Image from "next/image";

import NavItem from "./NavItem";
import { Info, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { logout } from "@/app/(auth)/actions/logout";
import { Session } from "@/app/(auth)/actions/verifySession";
import { routes, routesAdmin } from "../../config/routesLinks";

interface NavigationProps {
  user: Session;
}

export default function Navigation({ user }: NavigationProps) {
  const pathname = usePathname();
  const { role, type } = user!;
  const allowedRoutes = routes.filter((route) => {
    if (route.roles.includes(role) && route.types.includes(type)) {
      return true;
    }
  });

  return (
    <nav className="flex flex-col justify-between w-72 h-full border-r border-slate-600">
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center gap-4 p-6 py-8 w-full ">
          <Image
            src={"/Logo.svg"}
            alt="Logo"
            width={60}
            height={60}
            className="w-16 h-16"
          />
          <Image
            src={"/LogoText.svg"}
            alt="Logo texto"
            width={85}
            height={85}
            className="w-20 h-16 antialiased"
          />
        </div>
        <p className="text-slate-400 self-start px-10 mt-4">Menu</p>
        <ul className="flex flex-col w-full gap-y-3 text-slate-400 p-4 px-6">
          {allowedRoutes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <NavItem
                icon={route.icon}
                name={route.name}
                path={route.path}
                key={route.name}
                isActive={isActive}
              />
            );
          })}
          {user?.type === "ADMIN" &&
            routesAdmin.map((route) => {
              const isActive = pathname === route.path;
              return (
                <NavItem
                  icon={route.icon}
                  name={route.name}
                  path={route.path}
                  key={route.name}
                  isActive={isActive}
                />
              );
            })}
        </ul>
      </div>
      <div className="flex flex-col w-full gap-y-3 text-slate-400 p-4 px-6">
        <button className="flex items-center gap-2 p-4 py-3 hover:bg-primary hover:text-slate-100 rounded-lg transition-colors duration-500 ease-out">
          <Info />
          <span className="text-sm">Ayuda</span>
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 p-4 py-3 hover:bg-primary hover:text-slate-100 rounded-lg transition-colors duration-500 ease-out"
        >
          <LogOut />
          <span className="text-sm">Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
}
