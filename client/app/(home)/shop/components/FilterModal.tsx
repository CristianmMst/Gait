"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category, Brand } from "@/lib/types";

interface FilterModalProps {
  initialCategories?: Category[];
  initialBrands?: Brand[];
}

export function FilterModal({
  initialCategories = [],
  initialBrands = [],
}: FilterModalProps) {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(600000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (minPrice > 0) params.append("minPrice", minPrice.toString());
    if (maxPrice < 600000) params.append("maxPrice", maxPrice.toString());
    if (selectedCategory) params.append("categoryId", selectedCategory);
    if (selectedBrand) params.append("brandId", selectedBrand);

    router.push(`/shop${params.toString() ? "?" + params.toString() : ""}`);
  };

  const handleClear = () => {
    setMinPrice(0);
    setMaxPrice(600000);
    setSelectedCategory("");
    setSelectedBrand("");
    router.push("/shop");
  };

  return (
    <div
      popover="auto"
      id="filter-popover"
      className="bg-zinc-900 border border-zinc-800 rounded-md p-4 min-h-64 min-w-96 origin-top-right"
    >
      <h2 className="text-white text-xl mb-2">Filtros</h2>
      <form className="flex flex-col gap-y-4">
        <div>
          <label className="text-slate-200 block mb-1">Categoría</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-zinc-800 text-zinc-300 w-full rounded-md outline-none focus:ring-4 ring-primary/50 max-h-10 text-ellipsis bg-zinc-900"
          >
            <option value="">Todas</option>
            {initialCategories.map((category: Category) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-slate-200 block mb-1">Marca</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="p-2 border border-zinc-800 text-zinc-300 w-full rounded-md outline-none focus:ring-4 ring-primary/50 max-h-10 text-ellipsis bg-zinc-900"
          >
            <option value="">Todas</option>
            {initialBrands.map((brand: Brand) => (
              <option key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-slate-200 block mb-1">Precio</label>
          <div className="flex items-center gap-x-2">
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full p-2 text-white border-zinc-800 border rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
              placeholder="Mínimo"
              style={{ MozAppearance: "textfield" }}
            />
            <span className="text-slate-200 font-bold">-</span>
            <input
              type="number"
              min={minPrice}
              max={600000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full p-2 text-white border-zinc-800 border rounded-md outline-none focus:border-primary focus:ring-4 ring-primary/50"
              placeholder="Máximo"
              style={{ MozAppearance: "textfield" }}
            />
          </div>
        </div>

        <div className="flex gap-x-2 mt-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary text-white rounded p-2 hover:bg-primary/80 transition-colors cursor-pointer"
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="text-red-500 underline rounded p-2 cursor-pointer"
          >
            Eliminar filtros
          </button>
        </div>
      </form>
    </div>
  );
}
