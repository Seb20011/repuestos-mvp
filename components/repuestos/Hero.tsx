import { Database } from "lucide-react";
import { VehicleSelector } from "@/components/repuestos/VehicleSelector";

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
    <section className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
            <Database className="h-4 w-4" />
            Catálogo compatible por vehículo
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            Encuentra repuestos por marca, modelo, año y motor.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Prototipo de tienda online para vender repuestos en Ecuador. El
            cliente filtra su vehículo, revisa piezas compatibles y cotiza
            directo por WhatsApp.
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