import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Camera, MessageCircle, ShieldCheck, Tag } from "lucide-react";

import { Header } from "@/components/repuestos/Header";
import { Footer } from "@/components/repuestos/Footer";
import { catalog } from "@/data/parts";
import { getFallbackImageByCategory } from "@/lib/product-images";
import {
  createPhotoConfirmationWhatsAppLink,
  createWhatsAppLink,
} from "@/lib/whatsapp";
import type { Product, Vehicle } from "@/types";

type ProductPageProps = {
  params: Promise<{
    sku: string;
  }>;
};

const demoVehicle: Vehicle = {
  brand: "Chevrolet",
  model: "Sail",
  year: "2015",
  engine: "1.4",
};

function findProduct(sku: string): Product | undefined {
  const normalizedSku = decodeURIComponent(sku).toUpperCase();

  return catalog.find((product) => product.sku.toUpperCase() === normalizedSku);
}

export function generateStaticParams() {
  return catalog.map((product) => ({
    sku: product.sku,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { sku } = await params;
  const product = findProduct(sku);

  if (!product) {
    return {
      title: "Producto no encontrado | Repuestos Ecuador",
    };
  }

  return {
    title: `${product.name} | Repuestos Ecuador`,
    description: `Consulta disponibilidad de ${product.name} para tu vehículo en Ecuador.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { sku } = await params;
  const product = findProduct(sku);

  if (!product) {
    notFound();
  }

  const whatsappLink = createWhatsAppLink(product, demoVehicle);
  const photoConfirmationLink = createPhotoConfirmationWhatsAppLink(
    product,
    demoVehicle
  );
  const imageSrc =
    product.imageUrl || getFallbackImageByCategory(product.category);
  const productSections = [
    {
      title: "Descripción",
      description:
        "Repuesto disponible para cotización. La compatibilidad puede variar según versión, motor, año y configuración del vehículo.",
    },
    {
      title: "Compatibilidad",
      description: `Compatible a verificar con ${demoVehicle.brand} ${demoVehicle.model} ${demoVehicle.year} ${demoVehicle.engine}`,
    },
    {
      title: "Garantía y entrega",
      description:
        "Garantía según proveedor y validación previa del repuesto.",
    },
    {
      title: "Antes de comprar",
      description:
        "Recomendamos confirmar el repuesto con foto, código OEM, matrícula, VIN o datos exactos del vehículo.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <div className="relative mb-6 h-64 overflow-hidden rounded-3xl bg-slate-100 md:h-80">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain p-6 md:p-8"
              />

              {!product.imageUrl && (
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                  Imagen referencial
                </span>
              )}
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  SKU
                </p>
                <p className="mt-1 font-black">{product.sku}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Marca
                </p>
                <p className="mt-1 font-black">{product.brand}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Precio
                </p>
                <p className="mt-1 font-black">{product.price}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Stock
                </p>
                <p className="mt-1 font-black">{product.stock}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {productSections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-2xl bg-slate-50 p-4"
                >
                  <h2 className="font-black">{section.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {section.description}
                  </p>
                </section>
              ))}
            </div>
          </article>

          <aside className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <ShieldCheck className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <p className="font-black">Compatibilidad demo</p>
                <p className="text-sm text-slate-300">
                  Confirma antes de comprar
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/10 p-4">
              <p className="text-sm text-slate-300">Vehículo compatible</p>
              <p className="mt-1 text-lg font-black">
                {demoVehicle.brand} {demoVehicle.model} {demoVehicle.year}{" "}
                {demoVehicle.engine}
              </p>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-300">
              <Tag className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              Los precios y disponibilidad son referenciales. Te confirmamos
              marca, stock y compatibilidad por WhatsApp.
            </div>

            <section className="mt-4 rounded-2xl bg-white/10 p-4">
              <h2 className="font-black">Métodos de pago</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Después de confirmar compatibilidad, disponibilidad y precio,
                recibirás un enlace seguro para completar el pago.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Tarjeta de crédito o débito",
                  "Transferencia",
                  "Enlace de pago",
                ].map((method) => (
                  <span
                    key={method}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-100"
                  >
                    {method}
                  </span>
                ))}
              </div>

              <button
                type="button"
                disabled
                className="mt-4 w-full rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold text-slate-300 opacity-80"
              >
                Pago disponible después de confirmar
              </button>
            </section>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
              >
                <MessageCircle className="h-5 w-5" />
                Consultar por WhatsApp
              </a>

              <a
                href={photoConfirmationLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
              >
                <Camera className="h-5 w-5" />
                Enviar foto para confirmar
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-slate-900 transition hover:bg-slate-100"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver al catálogo
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
