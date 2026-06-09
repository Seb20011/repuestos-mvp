"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { canPurchaseDirectly, clampCartQuantity } from "@/lib/purchase";
import type { Product } from "@/types";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  subtotalCents: number;
  itemCount: number;
};

const CART_STORAGE_KEY = "repuestos-cart";
const CartContext = createContext<CartContextValue | undefined>(undefined);

function isStoredCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<CartItem>;

  return (
    Boolean(item.product) &&
    typeof item.product?.sku === "string" &&
    typeof item.quantity === "number"
  );
}

function sanitizeCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isStoredCartItem)
    .filter((item) => canPurchaseDirectly(item.product))
    .map((item) => ({
      product: item.product,
      quantity: clampCartQuantity(item.quantity),
    }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    window.setTimeout(() => {
      if (cancelled) {
        return;
      }

      try {
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

        if (storedCart) {
          setItems(sanitizeCartItems(JSON.parse(storedCart)));
        }
      } catch {
        setItems([]);
      } finally {
        setStorageReady(true);
      }
    }, 0);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, storageReady]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (!canPurchaseDirectly(product)) {
      return;
    }

    setItems((currentItems) => {
      const safeQuantity = clampCartQuantity(quantity);
      const existingItem = currentItems.find(
        (item) => item.product.sku === product.sku
      );

      if (!existingItem) {
        return [...currentItems, { product, quantity: safeQuantity }];
      }

      return currentItems.map((item) =>
        item.product.sku === product.sku
          ? {
              ...item,
              product,
              quantity: clampCartQuantity(item.quantity + safeQuantity),
            }
          : item
      );
    });
  }, []);

  const removeItem = useCallback((sku: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.sku !== sku)
    );
  }, []);

  const updateQuantity = useCallback((sku: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.sku === sku
          ? { ...item, quantity: clampCartQuantity(quantity) }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const subtotalCents = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + (item.product.priceCents ?? 0) * item.quantity,
        0
      ),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotalCents,
      itemCount,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotalCents,
      itemCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}
