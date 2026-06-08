import { Database } from "lucide-react";
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

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 md:sticky md:top-0 md:min-h-screen md:grid-cols-2 md:items-center md:py-20">
        <div className="self-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
            <Database className="h-4 w-4" />
            Catálogo compatible por vehículo
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Encuentra repuestos por marca, modelo, año y motor.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Busca repuestos compatibles con tu vehículo, revisa opciones
            disponibles y cotiza directamente por WhatsApp.
          </p>
        </div>

        <VehicleSelector
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
