import { Wrench } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Wrench size={22} />
          </div>

          <div>
            <p className="text-lg font-black">Prototipo Repuestos</p>
            <p className="text-xs text-slate-500">
              Buscador automotriz para Ecuador
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/593999999999"
          target="_blank"
          className="rounded-2xl bg-emerald-600 px-4 py-2 font-bold text-white"
        >
          WhatsApp
        </a>
      </div>
    </header>
  );
}