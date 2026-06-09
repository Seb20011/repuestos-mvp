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
    <section id="como-comprar" className="bg-white py-6 md:py-12">
      <div className="mx-auto w-full max-w-7xl box-border px-4">
        <div className="max-w-3xl">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-600 md:mb-2 md:text-sm">
            Proceso de compra
          </p>
          <h2 className="text-2xl font-black tracking-tight md:text-4xl">
            Cómo comprar
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 md:mt-3 md:text-base">
            El proceso está pensado para evitar errores de compatibilidad y
            confirmar disponibilidad antes de pagar.
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:block md:rounded-3xl md:p-5 md:shadow-sm"
              >
                <div className="flex items-center justify-between md:mb-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 md:h-12 md:w-12 md:rounded-2xl md:shadow-sm">
                    <Icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <span className="hidden text-sm font-black text-slate-300 md:block">
                    0{index + 1}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="font-black text-slate-900">{step.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-500 md:mt-2 md:leading-6">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
