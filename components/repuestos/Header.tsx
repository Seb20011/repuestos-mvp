"use client";

import Link from "next/link";
import { MessageCircle, ShoppingCart, Wrench } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { WHATSAPP_PHONE } from "@/lib/whatsapp";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Cómo comprar", href: "/#como-comprar" },
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Talleres", href: "/#talleres" },
];

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl box-border items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 md:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white md:h-11 md:w-11">
            <Wrench size={20} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-black md:text-lg">
              <span className="md:hidden">Repuestos Online</span>
              <span className="hidden md:inline">
                Catálogo de Repuestos Online
              </span>
            </p>
            <p className="hidden text-xs text-slate-500 md:block">
              Buscador automotriz para Ecuador
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={`https://wa.me/${WHATSAPP_PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-black text-white transition hover:bg-emerald-700 md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>

          <Link
            href="/carrito"
            className="inline-flex h-10 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
            aria-label={`Ver carrito con ${itemCount} productos`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="min-w-5 rounded-full bg-emerald-600 px-1.5 py-0.5 text-center text-xs font-black text-white">
              {itemCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
