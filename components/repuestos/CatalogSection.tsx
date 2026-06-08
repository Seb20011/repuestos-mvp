import { Filter, Search } from "lucide-react";
import { ProductCard } from "@/components/repuestos/ProductCard";
import type { Product, Vehicle } from "@/types";

type CatalogSectionProps = {
  filtered: Product[];
  categories: string[];
  stockOptions: string[];
  brandOptions: string[];
  selectedCategory: string;
  selectedStock: string;
  selectedBrand: string;
  query: string;
  vehicle: Vehicle;
  setQuery: (value: string) => void;
  setCategory: (value: string) => void;
  setStockFilter: (value: string) => void;
  setBrandFilter: (value: string) => void;
};

export function CatalogSection({
  filtered,
  categories,
  stockOptions,
  brandOptions,
  selectedCategory,
  selectedStock,
  selectedBrand,
  query,
  vehicle,
  setQuery,
  setCategory,
  setStockFilter,
  setBrandFilter,
}: CatalogSectionProps) {
  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
            Catálogo inicial
          </p>

          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            60 repuestos de alta rotación
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500">
            Listado inicial organizado por categorías para encontrar, comparar
            y cotizar repuestos de forma rápida.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)]">
        <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
          <Search className="ml-2 h-5 w-5 text-slate-400" />
          <input
            className="w-full border-0 bg-transparent px-2 py-2 outline-none"
            placeholder="Buscar sensor, filtro, freno..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <label className="rounded-2xl bg-white px-4 py-3 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Disponibilidad
          </span>
          <select
            className="mt-1 w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
            value={selectedStock}
            onChange={(event) => setStockFilter(event.target.value)}
          >
            {stockOptions.map((stock) => (
              <option key={stock} value={stock}>
                {stock}
              </option>
            ))}
          </select>
        </label>

        <label className="rounded-2xl bg-white px-4 py-3 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Tipo de marca
          </span>
          <select
            className="mt-1 w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
            value={selectedBrand}
            onChange={(event) => setBrandFilter(event.target.value)}
          >
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
              selectedCategory === cat
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
        <Filter className="h-4 w-4" />
        Mostrando {filtered.length} productos para {vehicle.brand}{" "}
        {vehicle.model} {vehicle.year} {vehicle.engine}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((part) => (
            <ProductCard key={part.id} part={part} vehicle={vehicle} />
          ))
        ) : (
          <div className="rounded-3xl bg-white p-6 text-sm leading-6 text-slate-500 shadow-sm md:col-span-2 lg:col-span-3">
            No encontramos productos con esos filtros. Prueba otra categoría,
            disponibilidad o tipo de marca.
          </div>
        )}
      </div>
    </section>
  );
}
