import { MessageCircle, ShieldCheck, Truck } from "lucide-react";

const footerItems = [
  "Atención por WhatsApp",
  "Envíos a todo Ecuador",
  "Confirma compatibilidad antes de comprar",
];

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-7xl box-border px-4 pb-28 pt-7 md:py-10">
        <div className="grid gap-5 md:grid-cols-[1.2fr_2fr] md:items-start md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white md:h-11 md:w-11">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-black md:text-lg">
                  Catálogo de Repuestos Online
                </p>
                <p className="text-sm text-slate-500">
                  Repuestos automotrices para Ecuador
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 md:gap-3">
            {footerItems.map((item, index) => {
              const Icon =
                index === 0 ? MessageCircle : index === 1 ? Truck : ShieldCheck;

              return (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700 md:rounded-2xl md:p-4"
                >
                  <Icon className="h-5 w-5 text-emerald-600" />
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-5 border-t pt-5 text-sm leading-6 text-slate-500 md:mt-8 md:pt-6">
          Los precios, imágenes y disponibilidad son referenciales. La
          compatibilidad debe ser confirmada antes de la compra.
        </p>
      </div>
    </footer>
  );
}
