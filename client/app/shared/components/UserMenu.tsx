import { Cog, LogOut } from "lucide-react";
import { logout } from "@/app/auth/actions/logout";

export const UserMenu = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      className="absolute bottom-14 -right-2 mb-2 w-48 border border-slate-600 rounded z-10 bg-zinc-950"
    >
      <button
        className="flex gap-x-2 items-center w-full hover:bg-primary transition-colors duration-300 px-4 py-3 text-slate-200 rounded-t"
        role="menuitem"
      >
        <Cog size={18} />
        <span>Configuraciones</span>
      </button>
      <button
        onClick={logout}
        className="flex gap-x-2 items-center w-full hover:bg-primary transition-colors duration-300 px-4 py-3 text-slate-200 rounded-b"
        role="menuitem"
      >
        <LogOut size={18} />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
};
