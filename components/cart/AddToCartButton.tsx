"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { canPurchaseDirectly } from "@/lib/purchase";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  className?: string;
};

export function AddToCartButton({
  product,
  quantity = 1,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!canPurchaseDirectly(product)) {
    return null;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Button
      type="button"
      className={cn(
        "h-11 rounded-2xl bg-emerald-600 px-4 font-bold text-white hover:bg-emerald-700",
        className
      )}
      onClick={handleAddToCart}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Agregado
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Agregar al carrito
        </>
      )}
    </Button>
  );
}
