import type { Product, Vehicle } from "@/types";

export const WHATSAPP_PHONE = "593968370301";

export function createWhatsAppLink(product: Product, vehicle: Vehicle) {
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

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function createPhotoConfirmationWhatsAppLink(
  product: Product,
  vehicle: Vehicle
) {
  const message = `
Hola, quiero confirmar este repuesto. Puedo enviar foto de la pieza o datos del vehículo.

Producto: ${product.name}
SKU: ${product.sku}

Vehículo:
${vehicle.brand} ${vehicle.model} ${vehicle.year} ${vehicle.engine}
`.trim();

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
