"use client";
import Link from "next/link";
import Image from "next/image";

import { UserMenu } from "./UserMenu";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { CircleUser, EllipsisVertical } from "lucide-react";
import { Session } from "@/app/(auth)/actions/verifySession";
import { useClickOutside } from "@/app/shared/hooks/useClickOutside";
import { routes, routesAdmin, ROLE, TYPE_USERS } from "../config/routesLinks";

interface NavigationProps {
  role: ROLE;
  type: TYPE_USERS;
  user: Session;
}

export default function Navigation({ role, user, type }: NavigationProps) {
  const pathname = usePathname();
  const allowedRoutes = routes.filter((route) => {
    if (route.roles.includes(role) && route.types.includes(type)) {
      return true;
    }
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useClickOutside(menuRef, () => setIsMenuOpen(false));

  return (
    <nav className="flex flex-col justify-between h-full col-span-1 border-r border-slate-500">
      <div className="flex flex-col items-center gap-y-6">
        <div className="flex justify-center items-center gap-4 p-4 w-full">
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
        <ul className="flex flex-col w-full gap-2 text-slate-200 p-4">
          {allowedRoutes.map((route) => {
            const isActive = pathname === route.path;
            return (
              <li
                key={route.path}
                className={`${isActive ? "bg-gradient-to-t from-primary to-secondary" : "hover:bg-primary"} rounded transition-colors duration-500 ease-out`}
              >
                <Link href={route.path} className="flex gap-2 w-full p-2">
                  {route.icon}
                  <span>{route.name}</span>
                </Link>
              </li>
            );
          })}
          {user?.type === "ADMIN" &&
            routesAdmin.map((route) => {
              const isActive = pathname === route.path;
              return (
                <li
                  key={route.path}
                  className={`${isActive ? "bg-gradient-to-t from-primary to-secondary" : "hover:bg-primary"} rounded transition-colors duration-500 ease-out`}
                >
                  <Link href={route.path} className="flex gap-2 w-full p-2">
                    {route.icon}
                    <span>{route.name}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="relative border-t border-slate-500 p-4" ref={menuRef}>
        <div className="flex justify-between items-center w-full text-slate-200">
          <div className="flex gap-4 items-center">
            <CircleUser size={30} />
            <div className="flex flex-col">
              <span>{user?.name}</span>
              <span className="text-[10px]">{user?.email}</span>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:text-white"
          >
            <EllipsisVertical />
          </button>
        </div>
        <UserMenu isOpen={isMenuOpen} />
      </div>
    </nav>
  );
}
