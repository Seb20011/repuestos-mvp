import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { getFallbackImageByCategory } from "@/lib/product-images";
import { canPurchaseDirectly } from "@/lib/purchase";
import { createWhatsAppLink } from "@/lib/whatsapp";
import type { Product, Vehicle } from "@/types";

type ProductCardProps = {
  part: Product;
  vehicle: Vehicle;
};

function getStockBadgeClass(stock: string) {
  if (stock.includes("Disponible")) {
    return "bg-emerald-100 text-emerald-700";
  }

  if (stock.includes("Bajo pedido")) {
    return "bg-sky-100 text-sky-700";
  }

  if (stock.includes("Confirmar")) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-slate-700";
}

export function ProductCard({ part, vehicle }: ProductCardProps) {
  const imageSrc = part.imageUrl || getFallbackImageByCategory(part.category);
  const directPurchaseAvailable = canPurchaseDirectly(part);
  const compatibilityLabel = `Para ${vehicle.brand} ${vehicle.model} ${vehicle.engine}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition md:hover:-translate-y-1 md:hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-slate-50">
        <Image
          src={imageSrc}
          alt={part.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-4"
        />

        {!part.imageUrl && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-600 shadow-sm">
            Imagen referencial
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            {part.sku}
          </p>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${getStockBadgeClass(
              part.stock
            )}`}
          >
            {part.stock}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[48px] text-base font-black leading-6 text-slate-900 md:text-lg md:leading-7">
          {part.name}
        </h3>

        <p className="mt-2 text-sm font-bold text-slate-500">
          {compatibilityLabel}
        </p>

        <p className="mt-4 text-lg font-black text-slate-950">
          {part.price}
        </p>

        <div className="mt-4 grid gap-2">
          {directPurchaseAvailable ? (
            <AddToCartButton product={part} className="w-full rounded-xl" />
          ) : (
            <a
              href={createWhatsAppLink(part, vehicle)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              Confirmar compatibilidad
            </a>
          )}

          <Link
            href={`/producto/${part.sku}`}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-4 text-sm font-black text-slate-700 transition hover:bg-slate-50"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
