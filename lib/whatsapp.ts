type Product = {
  name: string;
  sku: string;
  category: string;
  price: string;
};

type Vehicle = {
  brand: string;
  model: string;
  year: string;
  engine: string;
};

export function createWhatsAppLink(product: Product, vehicle: Vehicle) {
  const phone = "593999999999";

  const message = `
Hola, quiero consultar este repuesto:

Producto: ${product.name}
SKU: ${product.sku}
Categoría: ${product.category}
Precio referencial: ${product.price}

Vehículo:
${vehicle.brand} ${vehicle.model} ${vehicle.year} ${vehicle.engine}

¿Me confirma disponibilidad, marca y precio final?
`.trim();

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}