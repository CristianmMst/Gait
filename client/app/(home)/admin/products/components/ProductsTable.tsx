"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, Trash2, Pencil } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";
import { EditProductModal } from "./EditProductModal";
import { Product, Brand, Category } from "@/lib/types";
import { deleteProductAction } from "../../actions/deleteProduct";
import { DeleteProductModal } from "@/app/shared/components/DeleteProductModal";

interface ProductsTableProps {
  products: Product[];
  brands: Brand[];
  categories: Category[];
}

export function ProductsTable({
  products,
  brands,
  categories,
}: ProductsTableProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDeleteProduct = async (productId: number) => {
    setDeletingId(productId);
    try {
      const result = await deleteProductAction(productId);

      if (!result.success) {
        console.error("Error al eliminar el producto:", result.message);
        alert(result.message || "Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error inesperado al eliminar el producto:", error);
      alert("Error inesperado al eliminar el producto");
    } finally {
      setDeletingId(null);
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-red-950">
          Sin stock
        </span>
      );
    } else if (stock < 10) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-yellow-950">
          Stock bajo ({stock})
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500 text-green-950">
          En stock ({stock})
        </span>
      );
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 rounded-lg shadow-md p-8 text-center">
        <p className="text-white text-lg">No hay productos registrados</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-zinc-950 border border-zinc-900 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-900">
            <thead className="bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Marca
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-zinc-950 divide-y divide-zinc-900">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-zinc-900 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="rounded-md bg-slate-700"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {product.category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {product.brand.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                    ${formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStockBadge(product.stock)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-x-4 justify-center">
                      <Link
                        href={`/shop/${product.id}`}
                        className="flex items-center gap-x-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                        title="Ver producto"
                      >
                        <Eye />
                      </Link>
                      <button
                        type="button"
                        popoverTarget={`edit-product-modal-${product.id}`}
                        className="flex items-center gap-x-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer"
                        title="Editar producto"
                      >
                        <Pencil />
                      </button>
                      <button
                        type="button"
                        popoverTarget={`delete-product-modal-${product.id}`}
                        disabled={deletingId === product.id}
                        className="flex items-center gap-x-2 transition-colors cursor-pointer text-red-400 hover:text-red-300 disabled:opacity-50"
                        title="Eliminar producto"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {products.map((product) => (
        <EditProductModal
          key={`edit-modal-${product.id}`}
          product={product}
          brands={brands}
          categories={categories}
        />
      ))}

      {products.map((product) => (
        <DeleteProductModal
          key={`delete-modal-${product.id}`}
          productId={product.id}
          productName={product.name}
          onConfirm={() => handleDeleteProduct(product.id)}
        />
      ))}
    </>
  );
}
