export type PaymentCustomer = {
  firstName: string;
  lastName: string;
  taxId?: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  reference: string;
};

export type PaymentSessionRequest = {
  items: Array<{
    sku: string;
    quantity: number;
  }>;
  customer: PaymentCustomer;
};

export type PaymentSessionResponse =
  | {
      success: true;
      orderId: string;
      totalCents: number;
      paymentUrl: string;
    }
  | {
      success: false;
      error: string;
    };

// Futuro: conectar PayPhone, Datafast o PlacetoPay desde el servidor.
// Nunca exponer claves privadas en NEXT_PUBLIC ni procesar datos de tarjeta en formularios propios.
