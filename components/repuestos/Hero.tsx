import { Database } from "lucide-react";
import { MobileVehicleSearch } from "@/components/repuestos/MobileVehicleSearch";
import { VehicleSelector } from "@/components/repuestos/VehicleSelector";
import { HeroMechanicalBackground } from "@/components/repuestos/HeroMechanicalBackground";

type HeroProps = {
  brand: string;
  model: string;
  year: string;
  engine: string;
  setBrand: (value: string) => void;
  setModel: (value: string) => void;
  setYear: (value: string) => void;
  setEngine: (value: string) => void;
};

export function Hero({
  brand,
  model,
  year,
  engine,
  setBrand,
  setModel,
  setYear,
  setEngine,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white md:min-h-[108vh]">
      <HeroMechanicalBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl box-border gap-5 px-4 py-7 md:sticky md:top-0 md:min-h-screen md:grid-cols-2 md:items-center md:gap-10 md:py-20">
        <div className="min-w-0 self-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold md:mb-5 md:text-sm">
            <Database className="h-4 w-4" />
            Catálogo compatible por vehículo
          </div>

          <h1 className="max-w-full text-[2rem] font-black leading-tight tracking-tight md:text-6xl">
            <span className="block max-w-[21rem] md:hidden">
              Encuentra el repuesto correcto
            </span>
            <span className="hidden md:inline">
              Encuentra repuestos por marca, modelo, año y motor.
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:mt-6 md:text-lg md:leading-8">
            <span className="md:hidden">
              Selecciona tu vehículo y busca piezas compatibles.
            </span>
            <span className="hidden md:inline">
              Busca repuestos compatibles con tu vehículo, revisa opciones
              disponibles y cotiza directamente por WhatsApp.
            </span>
          </p>

          <MobileVehicleSearch
            className="mt-6 md:hidden"
            brand={brand}
            model={model}
            year={year}
            engine={engine}
            setBrand={setBrand}
            setModel={setModel}
            setYear={setYear}
            setEngine={setEngine}
          />
        </div>

        <VehicleSelector
          className="hidden md:block"
          brand={brand}
          model={model}
          year={year}
          engine={engine}
          setBrand={setBrand}
          setModel={setModel}
          setYear={setYear}
          setEngine={setEngine}
        />
      </div>
    </section>
  );
}
