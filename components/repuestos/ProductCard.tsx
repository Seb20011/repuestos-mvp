import { Wrench } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";
import type { Product, Vehicle } from "@/types";

type ProductCardProps = {
  part: Product;
  vehicle: Vehicle;
};

export function ProductCard({ part, vehicle }: ProductCardProps) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Wrench className="h-6 w-6" />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            part.stock === "Disponible"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
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

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <p className="text-lg font-black">{part.price}</p>

        <a
          href={createWhatsAppLink(part, vehicle)}
          target="_blank"
          className="rounded-2xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700"
        >
          Consultar
        </a>
      </div>
    </article>
  );
}