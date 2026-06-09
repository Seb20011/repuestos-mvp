"use client";

import { Car, Search } from "lucide-react";

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
import { engines, modelsByBrand, vehicleBrands, years } from "@/data/vehicles";
import { cn } from "@/lib/utils";

type MobileVehicleSearchProps = {
  brand: string;
  model: string;
  year: string;
  engine: string;
  setBrand: (value: string) => void;
  setModel: (value: string) => void;
  setYear: (value: string) => void;
  setEngine: (value: string) => void;
  className?: string;
  variant?: "hero" | "compact";
  triggerLabel?: string;
};

export function MobileVehicleSearch({
  brand,
  model,
  year,
  engine,
  setBrand,
  setModel,
  setYear,
  setEngine,
  className,
  variant = "hero",
  triggerLabel = "Cambiar vehículo",
}: MobileVehicleSearchProps) {
  const hasVehicle = Boolean(brand && model && year && engine);
  const currentVehicle = hasVehicle
    ? `${brand} ${model} · ${year} · ${engine}`
    : "";
  const availableModels = modelsByBrand[brand] ?? [];
  const handleBrandChange = (value: string) => {
    setBrand(value);
    setModel(modelsByBrand[value]?.[0] ?? "");
  };

  const handleApply = () => {
    document.getElementById("catalogo")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Sheet>
      <div
        className={cn(
          "w-full max-w-[calc(100vw-2rem)] box-border",
          className
        )}
      >
        {variant === "hero" ? (
          <div className="w-full max-w-full box-border rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur">
            <SheetTrigger asChild>
              <Button className="h-11 w-full rounded-xl bg-emerald-600 px-4 text-sm font-black text-white hover:bg-emerald-700">
                <Search className="h-4 w-4" />
                {hasVehicle ? "Cambiar vehículo" : "Seleccionar vehículo"}
              </Button>
            </SheetTrigger>

            {hasVehicle && (
              <p className="mt-2 truncate text-center text-sm font-bold text-slate-200">
                {currentVehicle}
              </p>
            )}
          </div>
        ) : (
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-9 rounded-xl border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              {triggerLabel !== "Cambiar" && <Car className="h-4 w-4" />}
              {triggerLabel}
            </Button>
          </SheetTrigger>
        )}
      </div>

      <SheetContent
        side="bottom"
        className="max-h-[90vh] overflow-y-auto rounded-t-2xl border-slate-200 bg-white p-0 text-slate-900"
      >
        <SheetHeader className="px-5 pb-2 pt-5 text-left">
          <SheetTitle className="text-xl font-black">
            Buscar por vehículo
          </SheetTitle>
          <SheetDescription>
            Ajusta los datos para filtrar repuestos compatibles.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 px-5 pb-5">
          <div>
            <label className="mb-2 block text-sm font-bold">Marca</label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-emerald-500"
              value={brand}
              onChange={(event) => handleBrandChange(event.target.value)}
            >
              {vehicleBrands.map((vehicleBrand) => (
                <option key={vehicleBrand}>{vehicleBrand}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Modelo</label>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-emerald-500"
              value={model}
              onChange={(event) => setModel(event.target.value)}
            >
              {availableModels.map((vehicleModel) => (
                <option key={vehicleModel}>{vehicleModel}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-bold">Año</label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-emerald-500"
                value={year}
                onChange={(event) => setYear(event.target.value)}
              >
                {years.map((vehicleYear) => (
                  <option key={vehicleYear}>{vehicleYear}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold">Motor</label>
              <select
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-slate-900 outline-none focus:border-emerald-500"
                value={engine}
                onChange={(event) => setEngine(event.target.value)}
              >
                {engines.map((vehicleEngine) => (
                  <option key={vehicleEngine}>{vehicleEngine}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 p-3 text-sm text-slate-600">
            Vehículo actual: <strong>{currentVehicle}</strong>
          </div>

          <SheetClose asChild>
            <Button
              className="h-11 rounded-xl bg-emerald-600 text-base font-bold text-white hover:bg-emerald-700"
              onClick={handleApply}
            >
              Aplicar vehículo
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
