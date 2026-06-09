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
      <div className="hidden md:block">
        <HeroMechanicalBackground />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 py-8 md:sticky md:top-0 md:min-h-screen md:grid-cols-2 md:items-center md:gap-10 md:py-20">
        <div className="self-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm md:mb-5">
            <Database className="h-4 w-4" />
            Catálogo compatible por vehículo
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            <span className="md:hidden">
              Encuentra repuestos para tu vehículo
            </span>
            <span className="hidden md:inline">
              Encuentra repuestos por marca, modelo, año y motor.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:mt-6 md:text-lg md:leading-8">
            <span className="md:hidden">
              Selecciona tu vehículo y consulta piezas compatibles.
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
