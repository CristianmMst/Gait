import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NavItemProps {
  name: string;
  path: string;
  isActive: boolean;
  icon: React.ReactNode;
}

export default function NavItem({ name, path, icon, isActive }: NavItemProps) {
  return (
    <li
      className={`rounded-lg transition-colors duration-300  hover:bg-primary hover:text-slate-100 ${
        isActive ? "bg-primary text-slate-100" : ""
      }`}
    >
      <Link
        href={path}
        className="flex justify-between w-full p-3"
        aria-current={isActive ? "page" : undefined}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm">{name}</span>
        </div>
        {isActive && <ChevronRight />}
      </Link>
    </li>
  );
}
