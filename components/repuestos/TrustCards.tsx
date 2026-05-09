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
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-4">
      {trustCards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title} className="rounded-3xl bg-white p-5 shadow-sm">
            <Icon className="mb-4 h-7 w-7 text-emerald-600" />

            <h3 className="font-black">{card.title}</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {card.text}
            </p>
          </div>
        );
      })}
    </section>
  );
}