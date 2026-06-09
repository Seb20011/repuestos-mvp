"use client";

import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MobileCatalogFiltersProps = {
  categories: string[];
  stockOptions: string[];
  brandOptions: string[];
  selectedCategory: string;
  selectedStock: string;
  selectedBrand: string;
  setCategory: (value: string) => void;
  setStockFilter: (value: string) => void;
  setBrandFilter: (value: string) => void;
  className?: string;
  triggerLabel?: string;
  showActiveCount?: boolean;
  showIcon?: boolean;
};

export function MobileCatalogFilters({
  categories,
  stockOptions,
  brandOptions,
  selectedCategory,
  selectedStock,
  selectedBrand,
  setCategory,
  setStockFilter,
  setBrandFilter,
  className,
  triggerLabel = "Filtros",
  showActiveCount = true,
  showIcon = true,
}: MobileCatalogFiltersProps) {
  const activeFilterCount =
    (selectedCategory !== "Todas" ? 1 : 0) +
    (selectedStock !== "Todos" ? 1 : 0) +
    (selectedBrand !== "Todas" ? 1 : 0);

  const label =
    showActiveCount && activeFilterCount > 0
      ? `${triggerLabel} · ${activeFilterCount}`
      : triggerLabel;

  const clearFilters = () => {
    setCategory("Todas");
    setStockFilter("Todos");
    setBrandFilter("Todas");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 rounded-xl border-slate-200 bg-white px-4 text-sm font-black text-slate-700 hover:bg-slate-50",
            className
          )}
        >
          {showIcon && <SlidersHorizontal className="h-4 w-4" />}
          {label}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="max-h-[90vh] overflow-y-auto rounded-t-2xl border-slate-200 bg-white p-0 text-slate-900"
      >
        <SheetHeader className="px-5 pb-2 pt-5 text-left">
          <SheetTitle className="text-xl font-black">
            Filtros del catálogo
          </SheetTitle>
          <SheetDescription>
            Ajusta categoría, disponibilidad y tipo de marca.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 px-5 pb-5">
          <label>
            <span className="mb-2 block text-sm font-bold">Categoría</span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-800 outline-none focus:border-emerald-500"
              value={selectedCategory}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm font-bold">
              Disponibilidad
            </span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-800 outline-none focus:border-emerald-500"
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

          <label>
            <span className="mb-2 block text-sm font-bold">
              Tipo de marca
            </span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-800 outline-none focus:border-emerald-500"
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

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-slate-200 bg-white font-bold text-slate-700"
              onClick={clearFilters}
            >
              Limpiar filtros
            </Button>

            <SheetClose asChild>
              <Button className="h-11 rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-700">
                Aplicar filtros
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
