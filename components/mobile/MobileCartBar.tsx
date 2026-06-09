"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCart } from "@/components/cart/CartProvider";
import { formatCents } from "@/lib/purchase";

export function MobileCartBar() {
  const pathname = usePathname();
  const { itemCount, subtotalCents } = useCart();

  if (itemCount === 0 || pathname.startsWith("/carrito")) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-[76px] z-40 rounded-2xl bg-slate-900 p-3 text-white shadow-xl md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-black">
            {itemCount} {itemCount === 1 ? "producto" : "productos"}
          </p>
          <p className="text-xs text-slate-300">
            Subtotal {formatCents(subtotalCents)}
          </p>
        </div>

        <Link
          href="/carrito"
          className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white"
        >
          Ver carrito
        </Link>
      </div>
    </div>
  );
}
