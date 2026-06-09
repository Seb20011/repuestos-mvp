import { Wrench } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Cómo comprar", href: "/#como-comprar" },
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Talleres", href: "/#talleres" },
];

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Wrench size={22} />
          </div>

          <div>
            <p className="text-lg font-black">Catálogo de Repuestos Online</p>
            <p className="text-xs text-slate-500">
              Buscador automotriz para Ecuador
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
