import {
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

const trustCards = [
  {
    icon: ShieldCheck,
    title: "Compatibilidad",
    text: "Validación por vehículo antes de comprar",
  },
  {
    icon: Truck,
    title: "Envíos",
    text: "Cotización para todo Ecuador",
  },
  {
    icon: MessageCircle,
    title: "Venta por WhatsApp",
    text: "Atención rápida con mensaje automático",
  },
  {
    icon: ShoppingBag,
    title: "Sin stock gigante",
    text: "Modelo bajo pedido con proveedores directos",
  },
];

export function TrustCards() {
  return (
    <section className="mx-auto grid w-full max-w-7xl box-border gap-3 px-4 py-5 md:grid-cols-4 md:gap-4 md:py-8">
      {trustCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`rounded-2xl bg-white p-4 shadow-sm md:rounded-3xl md:p-5 ${
              index > 2 ? "hidden md:block" : ""
            }`}
          >
            <Icon className="mb-3 h-6 w-6 text-emerald-600 md:mb-4 md:h-7 md:w-7" />

            <h3 className="font-black">{card.title}</h3>

            <p className="mt-1 text-sm leading-5 text-slate-500 md:mt-2 md:leading-6">
              {card.text}
            </p>
          </div>
        );
      })}
    </section>
  );
}
