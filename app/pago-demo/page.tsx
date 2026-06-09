import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { Footer } from "@/components/repuestos/Footer";
import { Header } from "@/components/repuestos/Header";

export default function PaymentDemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <section className="mx-auto flex max-w-3xl px-4 py-16">
        <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <h1 className="mt-6 text-3xl font-black">
            Pago seguro próximamente
          </h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-500">
            Esta pantalla será reemplazada por el Checkout oficial de la
            pasarela de pagos.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
            No solicitamos número de tarjeta, CVV ni fecha de vencimiento en
            formularios propios. La integración futura debe redirigir a la
            pasarela o usar sus componentes oficiales.
          </div>

          <Link
            href="/#catalogo"
            className="mt-6 inline-flex rounded-2xl bg-emerald-600 px-5 py-3 font-bold text-white transition hover:bg-emerald-700"
          >
            Volver al catálogo
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
