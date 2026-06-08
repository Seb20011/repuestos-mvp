import { CarFront, MessageCircle, Search, Truck } from "lucide-react";

const steps = [
  {
    title: "Selecciona tu vehículo",
    description: "Marca, modelo, año y motor.",
    icon: CarFront,
  },
  {
    title: "Busca el repuesto",
    description: "Filtra por categoría, disponibilidad o tipo de marca.",
    icon: Search,
  },
  {
    title: "Confirma por WhatsApp",
    description: "Validamos compatibilidad, stock, marca y precio final.",
    icon: MessageCircle,
  },
  {
    title: "Coordinamos entrega",
    description: "Envío nacional o entrega según disponibilidad.",
    icon: Truck,
  },
];

export function HowToBuy() {
  return (
    <section id="como-comprar" className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
            Proceso de compra
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Cómo comprar
          </h2>
          <p className="mt-3 text-slate-500">
            El proceso está pensado para evitar errores de compatibilidad y
            confirmar disponibilidad antes de pagar.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-black text-slate-300">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-black text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
