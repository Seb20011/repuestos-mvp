import type { Product } from "@/types";

export const MIN_CART_QUANTITY = 1;
export const MAX_CART_QUANTITY = 10;

export function canPurchaseDirectly(product: Product) {
  return (
    product.directPurchase === true &&
    product.compatibilityVerified === true &&
    typeof product.priceCents === "number" &&
    product.stock.includes("Disponible")
  );
}

export function clampCartQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) {
    return MIN_CART_QUANTITY;
  }

  return Math.min(
    MAX_CART_QUANTITY,
    Math.max(MIN_CART_QUANTITY, Math.trunc(quantity))
  );
}

export function formatCents(priceCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceCents / 100);
}
