import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductsTable } from "./components/ProductsTable";
import { getAllProducts } from "../actions/getProducts";
import { getBrands, getCategories } from "../actions/getBrandsAndCategories";

export default async function AdminProductsPage() {
  const [products, brands, categories] = await Promise.all([
    getAllProducts(),
    getBrands(),
    getCategories(),
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestión de Productos
          </h1>
          <p className="text-gray-400">
            Administra todos los productos de la tienda
          </p>
        </div>
        <Link
          href="/admin/add_product"
          className="flex items-center gap-x-2 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer font-semibold shadow-lg"
        >
          <Plus size={20} />
          Agregar Producto
        </Link>
      </div>

      <div className="mb-6 bg-zinc-900 rounded-lg p-4 border border-zinc-800">
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Total de productos:</span>
            <span className="text-white font-semibold">{products.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">En stock:</span>
            <span className="text-green-400 font-semibold">
              {products.filter((p) => p.stock > 0).length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Sin stock:</span>
            <span className="text-red-400 font-semibold">
              {products.filter((p) => p.stock === 0).length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Stock bajo:</span>
            <span className="text-yellow-400 font-semibold">
              {products.filter((p) => p.stock > 0 && p.stock < 10).length}
            </span>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="bg-zinc-950 border border-zinc-900 rounded-lg shadow-md p-8 text-center">
            <p className="text-white text-lg">Cargando productos...</p>
          </div>
        }
      >
        <ProductsTable
          products={products}
          brands={brands}
          categories={categories}
        />
      </Suspense>
    </div>
  );
}
