import { catalog } from "@/data/parts";
import {
  MAX_CART_QUANTITY,
  MIN_CART_QUANTITY,
  canPurchaseDirectly,
} from "@/lib/purchase";
import type {
  PaymentCustomer,
  PaymentSessionRequest,
} from "@/lib/payments/types";

type UnknownRecord = Record<string, unknown>;

const requiredCustomerFields: Array<keyof PaymentCustomer> = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "province",
  "city",
  "address",
  "reference",
];

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function errorResponse(error: string, status = 400) {
  return Response.json(
    {
      success: false,
      error,
    },
    { status }
  );
}

function validateCustomer(value: unknown): PaymentCustomer | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  for (const field of requiredCustomerFields) {
    if (typeof value[field] !== "string" || !value[field].trim()) {
      return undefined;
    }
  }

  return {
    firstName: String(value.firstName).trim(),
    lastName: String(value.lastName).trim(),
    taxId: typeof value.taxId === "string" ? value.taxId.trim() : "",
    email: String(value.email).trim(),
    phone: String(value.phone).trim(),
    province: String(value.province).trim(),
    city: String(value.city).trim(),
    address: String(value.address).trim(),
    reference: String(value.reference).trim(),
  };
}

export async function POST(request: Request) {
  let payload: Partial<PaymentSessionRequest>;

  try {
    payload = (await request.json()) as Partial<PaymentSessionRequest>;
  } catch {
    return errorResponse("Solicitud inválida.");
  }

  if (!isRecord(payload)) {
    return errorResponse("Solicitud inválida.");
  }

  const customer = validateCustomer(payload.customer);

  if (!customer) {
    return errorResponse("Datos de cliente incompletos.");
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return errorResponse("El carrito está vacío.");
  }

  let totalCents = 0;

  for (const rawItem of payload.items) {
    if (!isRecord(rawItem)) {
      return errorResponse("Producto inválido.");
    }

    const sku = typeof rawItem.sku === "string" ? rawItem.sku.trim() : "";
    const quantity = Number(rawItem.quantity);

    if (
      !sku ||
      !Number.isInteger(quantity) ||
      quantity < MIN_CART_QUANTITY ||
      quantity > MAX_CART_QUANTITY
    ) {
      return errorResponse("Cantidad inválida. Usa valores entre 1 y 10.");
    }

    const product = catalog.find(
      (catalogProduct) =>
        catalogProduct.sku.toUpperCase() === sku.toUpperCase()
    );

    if (!product) {
      return errorResponse(`SKU no encontrado: ${sku}.`);
    }

    if (!canPurchaseDirectly(product) || typeof product.priceCents !== "number") {
      return errorResponse(
        `${product.name} requiere confirmación antes del pago.`
      );
    }

    totalCents += product.priceCents * quantity;
  }

  const orderId = `ORD-${Date.now()}`;

  return Response.json({
    success: true,
    orderId,
    totalCents,
    paymentUrl: "/pago-demo",
  });
}
