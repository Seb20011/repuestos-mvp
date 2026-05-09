"use client";


import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";

import { catalog } from "@/data/parts";
import { ProductCard } from "@/components/repuestos/ProductCard";
import { Header } from "@/components/repuestos/Header";
import { Hero } from "@/components/repuestos/Hero";
import { TrustCards } from "@/components/repuestos/TrustCards";

const categories = ["Todas", ...Array.from(new Set(catalog.map((p) => p.category)))];

export default function HomePage() {
  const [brand, setBrand] = useState("Chevrolet");
  const [model, setModel] = useState("Sail");
  const [year, setYear] = useState("2015");
  const [engine, setEngine] = useState("1.4");
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return catalog.filter((item) => {
      const matchesQuery =
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase());

      const matchesCategory = category === "Todas" || item.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const selectedVehicle = {
    brand,
    model,
    year,
    engine,
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
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

      <TrustCards />

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-600">
              Catálogo inicial
            </p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              60 repuestos de alta rotación
            </h2>
            <p className="mt-3 max-w-2xl text-slate-500">
              Este prototipo usa tu listado inicial y lo organiza por categorías
              para poder vender y validar demanda.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm">
            <Search className="ml-2 h-5 w-5 text-slate-400" />
            <input
              className="w-full border-0 bg-transparent px-2 py-2 outline-none"
              placeholder="Buscar sensor, filtro, freno..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${category === cat
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
          <Filter className="h-4 w-4" />
          Mostrando {filtered.length} productos para {brand} {model} {year}{" "}
          {engine}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((part) => (
            <ProductCard key={part.id} part={part} vehicle={selectedVehicle} />
          ))}
        </div>
      </section>
    </main>
  );
}