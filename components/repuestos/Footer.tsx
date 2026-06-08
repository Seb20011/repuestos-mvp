import { MessageCircle, ShieldCheck, Truck } from "lucide-react";

const footerItems = [
  "Atención por WhatsApp",
  "Envíos a todo Ecuador",
  "Confirma compatibilidad antes de comprar",
];

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_2fr] md:items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-black">
                  Catálogo de Repuestos Online
                </p>
                <p className="text-sm text-slate-500">
                  Repuestos automotrices para Ecuador
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {footerItems.map((item, index) => {
              const Icon = index === 0 ? MessageCircle : index === 1 ? Truck : ShieldCheck;

              return (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700"
                >
                  <Icon className="h-5 w-5 text-emerald-600" />
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 border-t pt-6 text-sm leading-6 text-slate-500">
          Los precios, imágenes y disponibilidad son referenciales. La
          compatibilidad debe ser confirmada antes de la compra.
        </p>
      </div>
    </footer>
  );
}
