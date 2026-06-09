"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart/CartProvider";
import { Footer } from "@/components/repuestos/Footer";
import { Header } from "@/components/repuestos/Header";
import { Button } from "@/components/ui/button";
import { getFallbackImageByCategory } from "@/lib/product-images";
import {
  MAX_CART_QUANTITY,
  MIN_CART_QUANTITY,
  formatCents,
} from "@/lib/purchase";
import type {
  PaymentCustomer,
  PaymentSessionResponse,
} from "@/lib/payments/types";

type CustomerForm = PaymentCustomer;

const initialCustomer: CustomerForm = {
  firstName: "",
  lastName: "",
  taxId: "",
  email: "",
  phone: "",
  province: "",
  city: "",
  address: "",
  reference: "",
};

const requiredFields: Array<keyof CustomerForm> = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "province",
  "city",
  "address",
  "reference",
];

const fieldLabels: Record<keyof CustomerForm, string> = {
  firstName: "Nombres",
  lastName: "Apellidos",
  taxId: "Cédula/RUC opcional",
  email: "Correo",
  phone: "Teléfono",
  province: "Provincia",
  city: "Ciudad",
  address: "Dirección",
  reference: "Referencia",
};

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotalCents,
    clearCart,
    removeItem,
    updateQuantity,
  } = useCart();
  const [customer, setCustomer] = useState<CustomerForm>(initialCustomer);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerForm, string>>>(
    {}
  );
  const [checkoutError, setCheckoutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateCustomer = (field: keyof CustomerForm, value: string) => {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [field]: value,
    }));
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  };

  const validateCustomer = () => {
    const nextErrors: Partial<Record<keyof CustomerForm, string>> = {};

    for (const field of requiredFields) {
      if (!customer[field]?.trim()) {
        nextErrors[field] = "Campo requerido";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckoutError("");

    if (items.length === 0) {
      setCheckoutError("Agrega al menos un producto antes de continuar.");
      return;
    }

    if (!validateCustomer()) {
      setCheckoutError("Completa los datos requeridos para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            sku: item.product.sku,
            quantity: item.quantity,
          })),
          customer,
        }),
      });
      const data = (await response.json()) as PaymentSessionResponse;

      if (!response.ok || !data.success) {
        setCheckoutError(
          data.success
            ? "No pudimos crear el pedido."
            : data.error
        );
        return;
      }

      clearCart();
      router.push(data.paymentUrl);
    } catch {
      setCheckoutError("No pudimos conectar con el checkout de prueba.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <form
        className="mx-auto max-w-7xl px-4 py-8 pb-28 md:py-12 md:pb-12"
        onSubmit={handleCheckout}
      >
        <Link
          href="/#catalogo"
          className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr]">
          <section className="space-y-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                Carrito
              </p>
              <h1 className="mt-2 text-3xl font-black md:text-5xl">
                Repuestos seleccionados
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Compra directa disponible solo para referencias simples con
                compatibilidad verificada. No solicitamos datos de tarjeta en
                esta página.
              </p>
            </div>

            {items.length === 0 ? (
              <div className="rounded-3xl bg-white p-6 text-sm leading-6 text-slate-500 shadow-sm">
                Tu carrito está vacío. Puedes agregar filtros y referencias
                habilitadas para compra directa desde el catálogo.
              </div>
            ) : (
              items.map((item) => {
                const imageSrc =
                  item.product.imageUrl ||
                  getFallbackImageByCategory(item.product.category);

                return (
                  <article
                    key={item.product.sku}
                    className="grid gap-4 rounded-3xl bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr]"
                  >
                    <div className="relative h-32 overflow-hidden rounded-2xl bg-slate-100 sm:h-full">
                      <Image
                        src={imageSrc}
                        alt={item.product.name}
                        fill
                        sizes="120px"
                        className="object-contain p-3"
                      />
                    </div>

                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            {item.product.sku}
                          </p>
                          <h2 className="mt-1 text-lg font-black">
                            {item.product.name}
                          </h2>
                          <p className="mt-1 text-sm text-slate-500">
                            Precio unitario:{" "}
                            <strong className="text-slate-800">
                              {formatCents(item.product.priceCents ?? 0)}
                            </strong>
                          </p>
                        </div>

                        <button
                          type="button"
                          className="rounded-2xl bg-slate-100 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          onClick={() => removeItem(item.product.sku)}
                          aria-label={`Eliminar ${item.product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                            Cantidad
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="h-9 w-9 rounded-2xl"
                              disabled={item.quantity <= MIN_CART_QUANTITY}
                              onClick={() =>
                                updateQuantity(
                                  item.product.sku,
                                  item.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <input
                              className="h-9 w-14 rounded-2xl border border-slate-200 text-center font-black outline-none"
                              min={MIN_CART_QUANTITY}
                              max={MAX_CART_QUANTITY}
                              type="number"
                              value={item.quantity}
                              onChange={(event) =>
                                updateQuantity(
                                  item.product.sku,
                                  Number(event.target.value)
                                )
                              }
                            />

                            <Button
                              type="button"
                              variant="outline"
                              className="h-9 w-9 rounded-2xl"
                              disabled={item.quantity >= MAX_CART_QUANTITY}
                              onClick={() =>
                                updateQuantity(
                                  item.product.sku,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Subtotal
                          </p>
                          <p className="text-xl font-black">
                            {formatCents(
                              (item.product.priceCents ?? 0) * item.quantity
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>

          <aside className="space-y-4">
            <section className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">Datos de compra</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Usaremos estos datos para preparar la orden y coordinar entrega.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {(Object.keys(fieldLabels) as Array<keyof CustomerForm>).map(
                  (field) => (
                    <label key={field}>
                      <span className="mb-2 block text-sm font-bold">
                        {fieldLabels[field]}
                      </span>
                      <input
                        className={inputClass}
                        type={field === "email" ? "email" : "text"}
                        value={customer[field] ?? ""}
                        onChange={(event) =>
                          updateCustomer(field, event.target.value)
                        }
                      />
                      {errors[field] && (
                        <span className="mt-1 block text-xs font-bold text-red-600">
                          {errors[field]}
                        </span>
                      )}
                    </label>
                  )
                )}
              </div>
            </section>

            <section className="sticky bottom-16 -mx-4 border-t border-slate-200 bg-slate-50/95 px-4 py-4 backdrop-blur md:static md:mx-0 md:rounded-3xl md:border md:bg-white md:p-5 md:shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {itemCount} productos
                  </p>
                  <p className="text-2xl font-black">
                    {formatCents(subtotalCents)}
                  </p>
                </div>
                <p className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  Total
                </p>
              </div>

              {checkoutError && (
                <p className="mt-3 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">
                  {checkoutError}
                </p>
              )}

              <Button
                type="submit"
                className="mt-4 h-12 w-full rounded-2xl bg-emerald-600 text-base font-bold text-white hover:bg-emerald-700"
                disabled={items.length === 0 || isSubmitting}
              >
                {isSubmitting ? "Preparando pago..." : "Continuar al pago"}
              </Button>
            </section>
          </aside>
        </div>
      </form>

      <Footer />
    </main>
  );
}
