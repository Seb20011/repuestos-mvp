"use client";

import { useMemo, useState } from "react";

import { catalog } from "@/data/parts";
import { CatalogSection } from "@/components/repuestos/CatalogSection";
import { Header } from "@/components/repuestos/Header";
import { Hero } from "@/components/repuestos/Hero";
import { HowToBuy } from "@/components/repuestos/HowToBuy";
import { WorkshopCTA } from "@/components/repuestos/WorkshopCTA";
import { Footer } from "@/components/repuestos/Footer";

const categories = [
  "Todas",
  ...Array.from(new Set(catalog.map((p) => p.category))),
];

const stockOptions = [
  "Todos",
  "Disponible para cotización",
  "Bajo pedido 24–48h",
  "Confirmar stock",
];

const brandOptions = [
  "Todas",
  "Económico",
  "Alternativo",
  "OEM equivalente",
  "Premium",
];

export default function HomePage() {
  const [brand, setBrand] = useState("Chevrolet");
  const [model, setModel] = useState("Sail");
  const [year, setYear] = useState("2015");
  const [engine, setEngine] = useState("1.4");
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("Todos");
  const [brandFilter, setBrandFilter] = useState("Todas");

  const filtered = useMemo(() => {
    return catalog.filter((item) => {
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.sku.toLowerCase().includes(normalizedQuery) ||
        item.brand.toLowerCase().includes(normalizedQuery);

      const matchesCategory = category === "Todas" || item.category === category;
      const matchesStock =
        stockFilter === "Todos" || item.stock === stockFilter;
      const matchesBrand =
        brandFilter === "Todas" || item.brand === brandFilter;

      return matchesQuery && matchesCategory && matchesStock && matchesBrand;
    });
  }, [query, category, stockFilter, brandFilter]);

  const selectedVehicle = {
    brand,
    model,
    year,
    engine,
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 pb-24 text-slate-900 md:pb-0">
      <Header />
      <Hero
        brand={brand}
        model={model}
        year={year}
        engine={engine}
        setBrand={setBrand}
        setModel={setModel}
        setYear={setYear}
        setEngine={setEngine}
      />

      <HowToBuy />

      <CatalogSection
        filtered={filtered}
        categories={categories}
        stockOptions={stockOptions}
        brandOptions={brandOptions}
        selectedCategory={category}
        selectedStock={stockFilter}
        selectedBrand={brandFilter}
        query={query}
        vehicle={selectedVehicle}
        setQuery={setQuery}
        setCategory={setCategory}
        setStockFilter={setStockFilter}
        setBrandFilter={setBrandFilter}
      />

      <WorkshopCTA />

      <Footer />
    </main>
  );
}
