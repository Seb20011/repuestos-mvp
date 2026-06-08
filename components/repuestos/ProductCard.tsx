import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Wrench } from "lucide-react";
import { getFallbackImageByCategory } from "@/lib/product-images";
import {
  createPhotoConfirmationWhatsAppLink,
  createWhatsAppLink,
} from "@/lib/whatsapp";
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
  const photoConfirmationLink = createPhotoConfirmationWhatsAppLink(
    part,
    vehicle
  );

  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative mb-4 h-40 overflow-hidden rounded-2xl bg-slate-100">
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

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Wrench className="h-6 w-6" />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${getStockBadgeClass(
            part.stock
          )}`}
        >
          {part.stock}
        </span>
      </div>

      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
        {part.sku}
      </p>

      <h3 className="mt-2 min-h-[56px] text-lg font-black leading-7">
        {part.name}
      </h3>

      <div className="mt-4 space-y-2 text-sm text-slate-500">
        <p>
          <strong className="text-slate-700">Categoría:</strong>{" "}
          {part.category}
        </p>
        <p>
          <strong className="text-slate-700">Marca:</strong> {part.brand}
        </p>
        <p>
          <strong className="text-slate-700">Compatible:</strong>{" "}
          {vehicle.brand} {vehicle.model} {vehicle.year} {vehicle.engine}
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-2xl bg-slate-50 p-3 text-xs font-bold leading-5 text-slate-500">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        Confirmar compatibilidad antes de comprar.
      </div>

      <div className="mt-5 border-t pt-4">
        <p className="text-lg font-black">{part.price}</p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            href={`/producto/${part.sku}`}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-center font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Ver detalle
          </Link>

          <a
            href={createWhatsAppLink(part, vehicle)}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-emerald-600 px-4 py-2 text-center font-bold text-white transition hover:bg-emerald-700"
          >
            Consultar
          </a>
        </div>

        <a
          href={photoConfirmationLink}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex w-full justify-center text-sm font-bold text-emerald-700 transition hover:text-emerald-800"
        >
          Enviar foto por WhatsApp
        </a>
      </div>
    </article>
  );
}
