"use client";

import { useRef, useActionState, useEffect } from "react";
import { Pencil, X } from "lucide-react";
import { Product, Brand, Category } from "@/lib/types";
import { updateProductAction } from "../../actions/updateProduct";

interface EditProductModalProps {
  product: Product;
  brands: Brand[];
  categories: Category[];
}

export function EditProductModal({
  product,
  brands,
  categories,
}: EditProductModalProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  const updateProductWithId = updateProductAction.bind(null, product.id);

  const [state, formAction, isPending] = useActionState(
    updateProductWithId,
    undefined
  );

  const handleClose = () => {
    popoverRef.current?.hidePopover();
  };

  useEffect(() => {
    if (state?.success) {
      handleClose();
      window.location.reload();
    }
  }, [state?.success]);

  return (
    <div
      ref={popoverRef}
      id="edit-product-popover"
      popover="auto"
      className="bg-zinc-950 rounded-lg text-white w-full max-w-2xl overflow-y-auto p-0 border border-zinc-900 m-auto"
    >
      <div className="sticky top-0 border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-950">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Pencil size={24} />
          Editar Producto
        </h2>
        <button
          type="button"
          onClick={handleClose}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form action={formAction} className="p-6 space-y-4">
        {state?.message && !state?.success && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
            {state.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex flex-col gap-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre del producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={product.name}
              required
              autoComplete="off"
              className="w-full p-2 border border-zinc-800 rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Precio <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={product.price}
              step="0.01"
              min="0"
              required
              autoComplete="off"
              className="w-full p-2 border border-zinc-800 rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="discount" className="text-sm font-medium">
              Descuento (%)
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              defaultValue={product.discount || 0}
              step="0.01"
              min="0"
              max="100"
              autoComplete="off"
              className="w-full p-2 border border-zinc-800 rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="stock" className="text-sm font-medium">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              defaultValue={product.stock}
              min="0"
              autoComplete="off"
              className="w-full p-2 border border-zinc-800 rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="brandId" className="text-sm font-medium">
              Marca <span className="text-red-500">*</span>
            </label>
            <select
              id="brandId"
              name="brandId"
              defaultValue={product.brand.id}
              required
              className="p-2 border border-zinc-800 rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50 text-ellipsis"
            >
              <option value="">Selecciona una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={product.category.id}
              required
              className="p-2 border border-zinc-800 rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50 text-ellipsis"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              URL de la imagen
            </label>
            <input
              type="url"
              id="image"
              name="image"
              defaultValue={product.image}
              placeholder="https://ejemplo.com/imagen.jpg"
              autoComplete="off"
              className="w-full p-2 border border-zinc-800 rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={product.description}
              rows={4}
              className="w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="flex-1 px-4 py-2 border border-zinc-800 hover:bg-zinc-900 rounded-md transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-primary hover:bg-primary/80 rounded-md transition-colors disabled:opacity-50 font-semibold"
          >
            {isPending ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
