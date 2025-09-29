import Link from "next/link";
import { Truck, Folders, ShoppingCart, CircleDollarSign } from "lucide-react";

const links = [
  {
    name: "Crear pedido",
    href: "/products",
    icon: <ShoppingCart className="text-secondary" size={24} />,
    bgColor: "bg-primary/20",
  },
  {
    name: "Historial de pedidos",
    href: "/products",
    icon: <Folders className="text-accent" size={24} />,
    bgColor: "bg-accent/20",
  },
  {
    name: "Estado de pedidos",
    href: "/products",
    icon: <Truck className="text-blue-400" size={24} />,
    bgColor: "bg-blue-900/40",
  },
  {
    name: "Pagos en linea",
    href: "/products",
    icon: <CircleDollarSign className="text-green-400" size={24} />,
    bgColor: "bg-green-900/20",
  },
];

export default function Home() {
  return (
    <section className="flex-1 p-8 bg-black">
      <div className="bg-linear-to-br from-secondary via-primary to-secondary rounded-xl p-8">
        <h2 className="text-3xl font-bold">Distribuye productos de calidad</h2>
        <p className="w-1/2 mt-2">
          Acceso exclusivo a precios mayoristas y productos premium para
          distribuidores autorizados.
        </p>
        <button className="bg-accent text-primary rounded-md p-2 px-4 mt-6">
          Ver productos
        </button>
      </div>
      <ul className="grid grid-cols-4 items-center gap-x-5 mt-6">
        {links.map((link) => {
          return (
            <li
              key={link.name}
              className="bg-gray-900 rounded-lg hover:scale-105 transition-transform duration-500 ease-out"
            >
              <Link
                href={link.href}
                className="flex items-center gap-x-4 px-6 p-4"
              >
                <div className={`p-2 rounded-lg ${link.bgColor}`}>
                  {link.icon}
                </div>
                <p className="text-sm 2xl:text-base">{link.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
