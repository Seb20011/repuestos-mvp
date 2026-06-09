import { MessageCircle, Search, X } from "lucide-react";
import { MobileCatalogFilters } from "@/components/repuestos/MobileCatalogFilters";
import { ProductCard } from "@/components/repuestos/ProductCard";
import { WHATSAPP_PHONE } from "@/lib/whatsapp";
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
  const emptyMessage = encodeURIComponent(
    "Hola, no encontré el repuesto que necesito en el catálogo. ¿Me pueden ayudar a cotizarlo?"
  );

  const clearCatalogFilters = () => {
    setQuery("");
    setCategory("Todas");
    setStockFilter("Todos");
    setBrandFilter("Todas");
  };

  return (
    <section
      id="catalogo"
      className="mx-auto w-full max-w-7xl box-border px-4 py-5 md:py-12"
    >
      <div className="mb-3 flex flex-col justify-between gap-2 md:mb-6 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-600 md:mb-2 md:text-sm">
            Catálogo
          </p>

          <h2 className="hidden text-3xl font-black tracking-tight md:block md:text-4xl">
            60 repuestos de alta rotación
          </h2>

          <h2 className="text-2xl font-black tracking-tight leading-tight md:hidden">
            {filtered.length} repuestos disponibles
          </h2>

          <p className="mt-3 hidden max-w-2xl text-slate-500 md:block">
            Listado inicial organizado por categorías para encontrar, comparar
            y cotizar repuestos de forma rápida.
          </p>
        </div>
      </div>

      <div className="mb-3 grid gap-3 md:mb-6 md:grid-cols-[minmax(0,1.4fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)]">
        <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 md:h-auto md:rounded-2xl md:px-4 md:py-3">
          <Search className="h-4 w-4 shrink-0 text-slate-400 md:h-5 md:w-5" />
          <input
            className="min-w-0 flex-1 border-0 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400 md:text-base"
            placeholder="Buscar filtro, sensor, freno..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <label className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 md:block">
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

        <label className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 md:block">
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
              className={`h-9 whitespace-nowrap rounded-full px-3 text-sm font-bold transition ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
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
        {filtered.length} resultados para {vehicle.brand} {vehicle.model}{" "}
        {vehicle.year} {vehicle.engine}
      </div>

      <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((part) => (
            <ProductCard key={part.id} part={part} vehicle={vehicle} />
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center md:col-span-2 md:p-8 lg:col-span-3">
            <h3 className="text-lg font-black text-slate-900">
              No encontramos repuestos
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Prueba otra búsqueda o limpia los filtros.
            </p>
            <div className="mt-5 grid gap-2 sm:mx-auto sm:max-w-md sm:grid-cols-2">
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                onClick={clearCatalogFilters}
              >
                Limpiar filtros
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${emptyMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
