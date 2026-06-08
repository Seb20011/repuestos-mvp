import { MessageCircle, Wrench } from "lucide-react";

import { WHATSAPP_PHONE } from "@/lib/whatsapp";

const workshopMessage =
  "Hola, tengo un taller y quiero cotizar una lista de repuestos.";

export function WorkshopCTA() {
  return (
    <section id="talleres" className="bg-slate-900 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-3xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-emerald-300">
            <Wrench className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            ¿Tienes taller o compras repuestos con frecuencia?
          </h2>
          <p className="mt-3 text-slate-300">
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
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
        >
          <MessageCircle className="h-5 w-5" />
          Cotizar para taller
        </a>
      </div>
    </section>
  );
}
