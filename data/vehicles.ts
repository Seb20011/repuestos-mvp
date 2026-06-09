export const vehicleBrands = [
  "Chevrolet",
  "Toyota",
  "Kia",
  "Hyundai",
  "Nissan",
  "Mazda",
];

export const modelsByBrand: Record<string, string[]> = {
  Chevrolet: ["Sail", "Aveo", "D-Max", "Spark", "Grand Vitara", "Tracker"],
  Toyota: ["Hilux", "Fortuner", "Corolla", "Yaris", "RAV4"],
  Kia: ["Rio", "Sportage", "Picanto", "Cerato"],
  Hyundai: ["Tucson", "Accent", "Elantra", "Santa Fe"],
  Nissan: ["Frontier", "Sentra", "X-Trail", "Versa"],
  Mazda: ["BT-50", "Mazda 3", "CX-5", "Mazda 2"],
};

export const years = Array.from({ length: 23 }, (_, i) => String(2026 - i));

export const engines = [
  "1.0",
  "1.2",
  "1.4",
  "1.5",
  "1.6",
  "1.8",
  "2.0",
  "2.4",
  "2.5 Diesel",
  "2.8 Diesel",
];
