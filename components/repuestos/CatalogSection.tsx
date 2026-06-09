import { Filter, Search } from "lucide-react";
import { MobileCatalogFilters } from "@/components/repuestos/MobileCatalogFilters";
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
  const mobileCategories = ["Todas", "Mantenimiento", "Frenos"].filter(
    (category) => categories.includes(category)
  );

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-6 md:py-12">
      <div className="mb-4 flex flex-col justify-between gap-3 md:mb-6 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
            Catálogo
          </p>

          <h2 className="hidden text-3xl font-black tracking-tight md:block md:text-4xl">
            60 repuestos de alta rotación
          </h2>

          <h2 className="text-2xl font-black tracking-tight md:hidden">
            {filtered.length} repuestos disponibles
          </h2>

          <p className="mt-3 hidden max-w-2xl text-slate-500 md:block">
            Listado inicial organizado por categorías para encontrar, comparar
            y cotizar repuestos de forma rápida.
          </p>
        </div>
      </div>

      <div className="mb-3 grid gap-3 md:mb-6 md:grid-cols-[minmax(0,1.4fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)]">
        <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
          <Search className="ml-2 h-5 w-5 text-slate-400" />
          <input
            className="w-full border-0 bg-transparent px-2 py-2 outline-none"
            placeholder="Buscar sensor, filtro, freno..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <label className="hidden rounded-2xl bg-white px-4 py-3 shadow-sm md:block">
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

        <label className="hidden rounded-2xl bg-white px-4 py-3 shadow-sm md:block">
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

      <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
        <MobileCatalogFilters
          categories={categories}
          stockOptions={stockOptions}
          brandOptions={brandOptions}
          selectedCategory={selectedCategory}
          selectedStock={selectedStock}
          selectedBrand={selectedBrand}
          setCategory={setCategory}
          setStockFilter={setStockFilter}
          setBrandFilter={setBrandFilter}
        />

        <p className="text-sm font-bold text-slate-500">
          {filtered.length} resultados
        </p>
      </div>

      <div className="mb-4 flex items-start gap-2 md:hidden">
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobileCategories.map((cat) => (
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

        <MobileCatalogFilters
          categories={categories}
          stockOptions={stockOptions}
          brandOptions={brandOptions}
          selectedCategory={selectedCategory}
          selectedStock={selectedStock}
          selectedBrand={selectedBrand}
          setCategory={setCategory}
          setStockFilter={setStockFilter}
          setBrandFilter={setBrandFilter}
          triggerLabel="Más"
          showActiveCount={false}
          showIcon={false}
          className="h-9 shrink-0 rounded-full px-4"
        />
      </div>

      <div className="mb-7 hidden gap-2 overflow-x-auto pb-2 md:flex">
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

      <div className="mb-5 hidden items-center gap-2 text-sm text-slate-500 md:flex">
        <Filter className="h-4 w-4" />
        {filtered.length} resultados para {vehicle.brand} {vehicle.model}{" "}
        {vehicle.year} {vehicle.engine}
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
