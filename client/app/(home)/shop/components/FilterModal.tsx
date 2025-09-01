"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FilterModal() {
  const router = useRouter();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(600000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/shop?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  };

  const handleClear = () => {
    setMinPrice(0);
    setMaxPrice(600000);
    router.push("/shop");
  };

  return (
    <div
      popover="auto"
      id="filter-popover"
      className="bg-gray-700 rounded-md p-4 min-h-64 min-w-96 origin-top-right"
    >
      <h2 className="text-white text-xl mb-2">Filtros</h2>
      <form className="flex flex-col gap-y-4">
        <div>
          <label className="text-slate-200 block mb-1">Categoría</label>
          <select className="bg-gray-800 text-white rounded p-2 w-full">
            <option value="">Todas</option>
            <option value="categoria1">Categoría 1</option>
            <option value="categoria2">Categoría 2</option>
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
              className="bg-gray-800 text-white rounded p-2 w-24 text-center focus:outline focus:outline-primary"
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
              className="bg-gray-800 text-white rounded p-2 w-24 text-center focus:outline focus:outline-primary"
              placeholder="Máximo"
              style={{ MozAppearance: "textfield" }}
            />
          </div>
        </div>
        <div>
          <label className="text-slate-200 block mb-1">Marca</label>
          <input
            type="text"
            className="bg-gray-800 text-white rounded p-2 w-full"
            placeholder="Ej: Nike"
          />
        </div>
        <div className="flex gap-x-2 mt-2">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-primary text-white rounded p-2 hover:bg-primary/80 transition-colors"
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-500 text-white rounded p-2 hover:bg-gray-600 transition-colors"
          >
            Eliminar filtros
          </button>
        </div>
      </form>
    </div>
  );
}
