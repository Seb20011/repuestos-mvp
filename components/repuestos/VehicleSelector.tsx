import { Car } from "lucide-react";
import { engines, modelsByBrand, vehicleBrands, years } from "@/data/vehicles";
import { cn } from "@/lib/utils";

type VehicleSelectorProps = {
  brand: string;
  model: string;
  year: string;
  engine: string;
  setBrand: (value: string) => void;
  setModel: (value: string) => void;
  setYear: (value: string) => void;
  setEngine: (value: string) => void;
  className?: string;
};

export function VehicleSelector({
  brand,
  model,
  year,
  engine,
  setBrand,
  setModel,
  setYear,
  setEngine,
  className,
}: VehicleSelectorProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white p-6 text-slate-900 shadow-2xl",
        className
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-3">
          <Car className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-black">Buscar por vehículo</h2>
          <p className="text-sm text-slate-500">
            Selecciona los datos para filtrar compatibilidad.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-bold">Marca</label>
          <select
            className="w-full rounded-2xl border p-3"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setModel(modelsByBrand[e.target.value]?.[0] ?? "");
            }}
          >
            {vehicleBrands.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold">Modelo</label>
          <select
            className="w-full rounded-2xl border p-3"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            {(modelsByBrand[brand] ?? []).map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-bold">Año</label>
            <select
              className="w-full rounded-2xl border p-3"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Motor</label>
            <select
              className="w-full rounded-2xl border p-3"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
            >
              {engines.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4 text-sm">
          Vehículo seleccionado:{" "}
          <strong>
            {brand} {model} {year} {engine}
          </strong>
        </div>
      </div>
    </div>
  );
}
