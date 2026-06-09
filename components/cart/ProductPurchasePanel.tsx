"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Button } from "@/components/ui/button";
import {
  MAX_CART_QUANTITY,
  MIN_CART_QUANTITY,
  canPurchaseDirectly,
  clampCartQuantity,
  formatCents,
} from "@/lib/purchase";
import type { Product } from "@/types";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);

  if (!canPurchaseDirectly(product) || !product.priceCents) {
    return null;
  }

  const updateQuantity = (nextQuantity: number) => {
    setQuantity(clampCartQuantity(nextQuantity));
  };

  return (
    <section className="mt-4 rounded-2xl bg-white/10 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-black">Compra directa</h2>
          <p className="mt-1 text-2xl font-black">
            {formatCents(product.priceCents)}
          </p>
        </div>

        <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-200">
          Disponible
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-bold text-slate-200">Cantidad</p>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 rounded-2xl border-white/15 bg-white/10 text-white hover:bg-white/15"
            onClick={() => updateQuantity(quantity - 1)}
            disabled={quantity <= MIN_CART_QUANTITY}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <input
            className="h-10 w-16 rounded-2xl border border-white/15 bg-white/10 text-center font-black text-white outline-none"
            min={MIN_CART_QUANTITY}
            max={MAX_CART_QUANTITY}
            type="number"
            value={quantity}
            onChange={(event) => updateQuantity(Number(event.target.value))}
          />

          <Button
            type="button"
            variant="outline"
            className="h-10 w-10 rounded-2xl border-white/15 bg-white/10 text-white hover:bg-white/15"
            onClick={() => updateQuantity(quantity + 1)}
            disabled={quantity >= MAX_CART_QUANTITY}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AddToCartButton
        product={product}
        quantity={quantity}
        className="mt-4 w-full"
      />

      <p className="mt-3 text-sm leading-6 text-slate-300">
        Compra directa disponible para esta referencia. Verifica que el
        vehículo seleccionado coincida con la compatibilidad indicada.
      </p>
    </section>
  );
}
