import { Filter, Search } from "lucide-react";
import { ProductCard } from "@/components/repuestos/ProductCard";
import type { Product, Vehicle } from "@/types";

type CatalogSectionProps = {
  filtered: Product[];
  categories: string[];
  selectedCategory: string;
  query: string;
  vehicle: Vehicle;
  setQuery: (value: string) => void;
  setCategory: (value: string) => void;
};

export function CatalogSection({
  filtered,
  categories,
  selectedCategory,
  query,
  vehicle,
  setQuery,
  setCategory,
}: CatalogSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
            Catálogo inicial
          </p>

          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            60 repuestos de alta rotación
          </h2>

          <p className="mt-3 max-w-2xl text-slate-500">
            Este prototipo usa tu listado inicial y lo organiza por categorías
            para poder vender y validar demanda.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
          <Search className="ml-2 h-5 w-5 text-slate-400" />
          <input
            className="w-full border-0 bg-transparent px-2 py-2 outline-none"
            placeholder="Buscar sensor, filtro, freno..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
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
        {filtered.map((part) => (
          <ProductCard key={part.id} part={part} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}