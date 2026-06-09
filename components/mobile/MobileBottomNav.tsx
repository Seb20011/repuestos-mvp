"use client";

import Link from "next/link";
import { Home, MessageCircle, Search, ShoppingCart } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { WHATSAPP_PHONE } from "@/lib/whatsapp";

export function MobileBottomNav() {
  const { itemCount } = useCart();

  const scrollToCatalog = () => {
    const catalog = document.getElementById("catalogo");

    if (catalog) {
      catalog.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    window.location.href = "/#catalogo";
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="grid h-16 grid-cols-4">
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-slate-600"
        >
          <Home className="h-5 w-5" />
          Inicio
        </Link>

        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-slate-600"
          onClick={scrollToCatalog}
        >
          <Search className="h-5 w-5" />
          Buscar
        </button>

        <Link
          href="/carrito"
          className="relative flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-slate-600"
          aria-label={`Ver carrito con ${itemCount} productos`}
        >
          <span className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-emerald-600 px-1 text-center text-[10px] leading-4 text-white">
                {itemCount}
              </span>
            )}
          </span>
          Carrito
        </Link>

        <a
          href={`https://wa.me/${WHATSAPP_PHONE}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-emerald-700"
        >
          <MessageCircle className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
