import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import { MobileCartBar } from "@/components/mobile/MobileCartBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catálogo de Repuestos Online Ecuador",
  description:
    "Busca repuestos automotrices por marca, modelo, año y motor. Cotiza por WhatsApp y confirma compatibilidad antes de comprar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          {children}
          <MobileCartBar />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
