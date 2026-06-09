import { MessageCircle, Wrench } from "lucide-react";

import { WHATSAPP_PHONE } from "@/lib/whatsapp";

const workshopMessage =
  "Hola, tengo un taller y quiero cotizar una lista de repuestos.";

export function WorkshopCTA() {
  return (
    <section id="talleres" className="bg-slate-900 py-7 text-white md:py-12">
      <div className="mx-auto grid w-full max-w-7xl box-border gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-3xl">
          <div className="mb-3 hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 md:flex">
            <Wrench className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black tracking-tight md:text-4xl">
            <span className="md:hidden">¿Tienes taller?</span>
            <span className="hidden md:inline">
              ¿Tienes taller o compras repuestos con frecuencia?
            </span>
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300 md:mt-3 md:text-base">
            Podemos ayudarte a cotizar listas de repuestos para talleres,
            mecánicas y flotas. Envíanos el vehículo, año, motor y lista de
            piezas por WhatsApp.
          </p>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
            workshopMessage
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700 md:h-auto md:rounded-2xl md:py-3 md:text-base"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="md:hidden">Cotizar por WhatsApp</span>
          <span className="hidden md:inline">Cotizar para taller</span>
        </a>
      </div>
    </section>
  );
}
