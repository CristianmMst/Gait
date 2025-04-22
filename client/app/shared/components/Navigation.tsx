"use client";
import Link from "next/link";
import Image from "next/image";

import { UserMenu } from "./UserMenu";
import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Session } from "@/app/(auth)/actions/verifySession";
import { useClickOutside } from "@/app/shared/hooks/useClickOutside";
import { ChevronRight, CircleUser, EllipsisVertical } from "lucide-react";
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
              <li
                key={route.path}
                className={`${isActive && "bg-gradient-to-t from-primary to-secondary text-slate-200"} hover:bg-primary hover:text-slate-100 rounded-lg transition-colors duration-500 ease-out`}
              >
                <Link
                  href={route.path}
                  className="flex justify-between w-full p-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    {route.icon}
                    <span className="text-sm">{route.name}</span>
                  </div>
                  {isActive && <ChevronRight />}
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
                  className={`${isActive && "bg-gradient-to-t from-primary to-secondary text-slate-200"} hover:bg-primary hover:text-slate-100 rounded-lg transition-colors duration-500 ease-out`}
                >
                  <Link
                    href={route.path}
                    className="flex justify-between w-full p-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      {route.icon}
                      <span className="text-sm">{route.name}</span>
                    </div>
                    {isActive && <ChevronRight />}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="relative border-t border-slate-600 p-4" ref={menuRef}>
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
