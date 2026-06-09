export type Product = {
  id: number;
  name: string;
  category: string;
  sku: string;
  stock: string;
  price: string;
  brand: string;
  imageUrl?: string;
  directPurchase: boolean;
  priceCents?: number;
  compatibilityVerified: boolean;
  shippingWeightKg?: number;
};

export type Vehicle = {
  brand: string;
  model: string;
  year: string;
  engine: string;
};
