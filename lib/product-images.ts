const fallbackImagesByCategory: Record<string, string> = {
  Mantenimiento: "/repuestos/referencial-mantenimiento.webp",
  Frenos: "/repuestos/referencial-frenos.webp",
  "Suspensión y dirección": "/repuestos/referencial-suspension.webp",
  "Sensores y eléctrico": "/repuestos/referencial-sensores.webp",
  Refrigeración: "/repuestos/referencial-refrigeracion.webp",
  "Transmisión y embrague": "/repuestos/referencial-embrague.webp",
  Motor: "/repuestos/referencial-motor.webp",
  Iluminación: "/repuestos/referencial-iluminacion.webp",
  Combustible: "/repuestos/referencial-combustible.webp",
};

export function getFallbackImageByCategory(category: string): string {
  return fallbackImagesByCategory[category] ?? "/repuestos/placeholder.webp";
}
