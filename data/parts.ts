export const parts = [
  "FILTRO DE ACEITE",
  "FILTRO DE AIRE",
  "FILTRO DE COMBUSTIBLE",
  "FILTRO DE A/C",
  "BUJIAS",
  "CABLE DE BUJIAS",
  "PASTILLAS DELANTERAS",
  "PASTILLAS POSTERIORES",
  "ZAPATAS DE FRENO POST",
  "DISCOS DE FRENO",
  "TAMBORES DE FRENO",
  "CABLE FRENO DE MANO",
  "AMORTIGUADORES DELANTEROS",
  "AMORTIGUADORES POSTERIORES",
  "BASES DE AMORTIGUADOR",
  "TERMINALES DE DIRECCION",
  "ROTULA INFERIOR",
  "ROTULA SUPERIOR",
  "PLATOS DE SUSPENSION",
  "BOCINES DE PLATO",
  "ARTICULACIONES DE DIRECCION",
  "CAUCHOS DE BARRA ESTABILIZADORA",
  "BARRAS LINK",
  "RULIMANES DE RUEDA DELANTERAS",
  "RULIMANES DE RUEDA POSTERIORES",
  "BANDAS",
  "TENSOR DE BANDA",
  "EMPAQUE TAPA VALVULAS",
  "RETENEDOR DELANTERO CIGÜEÑAL",
  "RETENEDOR POSTERIOR CIGÜEÑAL",
  "TERMOSTATO",
  "SENSOR DE TEMPERATURA",
  "SENSOR CKP",
  "SENSOR MAF",
  "BOBINA DE ENCENDIDO",
  "TAPA RADIADOR",
  "MANGUERA SUPERIOR RADIADOR",
  "MANGUERA INFERIOR RADIADOR",
  "KIT DE EMBRAGUE",
  "RULIMAN PILOTO",
  "CILINDRO PRINCIPAL DE EMBRAGUE",
  "CILINDRO AUXILIAR DE EMBRAGUE",
  "CABLE DE EMBRAGUE",
  "FAROS DELANTEROS",
  "GUIAS POSTERIORES",
  "CILINDRO DE RUEDA POSTERIOR",
  "HORQUILLA - CUCHARETA DE EMBRAGUE",
  "BOMBA DE AGUA",
  "CRUCETAS",
  "RESERVORIO REFRIGERANTE",
  "TAPA DE REFRIGERANTE",
  "BASES DE MOTOR",
  "SENSOR CMP",
  "CAUCHOS DE PAQUETE",
  "FLOTADOR DE COMBUSTIBLE",
  "BOMBA DE COMBUSTIBLE",
  "SENSOR DE VELOCIDAD",
  "TROMPO DE STOP",
  "TROMPO DE NEUTRO",
  "TROMPO DE RETRO",
];

const formattedPartNames: Record<string, string> = {
  "FILTRO DE ACEITE": "Filtro de aceite",
  "FILTRO DE AIRE": "Filtro de aire",
  "FILTRO DE COMBUSTIBLE": "Filtro de combustible",
  "FILTRO DE COMBUTIBLE": "Filtro de combustible",
  "FILTRO DE A/C": "Filtro de cabina / A/C",
  BUJIAS: "Bujías",
  "CABLE DE BUJIAS": "Cable de bujías",
  "PASTILLAS DELANTERAS": "Pastillas de freno delanteras",
  "PASTILLAS POSTERIORES": "Pastillas de freno posteriores",
  "ZAPATAS DE FRENO POST": "Zapatas de freno posteriores",
  "DISCOS DE FRENO": "Discos de freno",
  "TAMBORES DE FRENO": "Tambores de freno",
  "CABLE FRENO DE MANO": "Cable de freno de mano",
  "AMORTIGUADORES DELANTEROS": "Amortiguadores delanteros",
  "AMORTIGUADORES POSTERIORES": "Amortiguadores posteriores",
  "BASES DE AMORTIGUADOR": "Bases de amortiguador",
  "TERMINALES DE DIRECCION": "Terminales de dirección",
  "ROTULA INFERIOR": "Rótula inferior",
  "ROTULA SUPERIOR": "Rótula superior",
  "PLATOS DE SUSPENSION": "Platos de suspensión",
  "BOCINES DE PLATO": "Bocines de plato",
  "ARTICULACIONES DE DIRECCION": "Articulaciones de dirección",
  "CAUCHOS DE BARRA ESTABILIZADORA": "Cauchos de barra estabilizadora",
  "BARRAS LINK": "Barras link",
  "RULIMANES DE RUEDA DELANTERAS": "Rulimanes de rueda delanteros",
  "RULIMANES DE RUEDA POSTERIORES": "Rulimanes de rueda posteriores",
  BANDAS: "Bandas",
  "TENSOR DE BANDA": "Tensor de banda",
  "EMPAQUE TAPA VALVULAS": "Empaque de tapa de válvulas",
  "RETENEDOR DELANTERO CIGÜEÑAL": "Retenedor delantero de cigüeñal",
  "RETENEDOR POSTERIOR CIGÜEÑAL": "Retenedor posterior de cigüeñal",
  TERMOSTATO: "Termostato",
  "SENSOR DE TEMPERATURA": "Sensor de temperatura",
  "SENSOR CKP": "Sensor CKP",
  "SENSOR MAF": "Sensor MAF",
  "BOBINA DE ENCENDIDO": "Bobina de encendido",
  "TAPA RADIADOR": "Tapa de radiador",
  "MANGUERA SUPERIOR RADIADOR": "Manguera superior de radiador",
  "MANGUERA INFERIOR RADIADOR": "Manguera inferior de radiador",
  "MANGIERA INFERIOR RADIADOR": "Manguera inferior de radiador",
  "KIT DE EMBRAGUE": "Kit de embrague",
  "RULIMAN PILOTO": "Rulimán piloto",
  "CILINDRO PRINCIPAL DE EMBRAGUE": "Cilindro principal de embrague",
  "CILINDRO AUXILIAR DE EMBRAGUE": "Cilindro auxiliar de embrague",
  "CABLE DE EMBRAGUE": "Cable de embrague",
  "FAROS DELANTEROS": "Faros delanteros",
  "GUIAS POSTERIORES": "Guías posteriores",
  "CILINDRO DE RUEDA POSTERIOR": "Cilindro de rueda posterior",
  "HORQUILLA - CUCHARETA DE EMBRAGUE": "Horquilla / cuchareta de embrague",
  "BOMBA DE AGUA": "Bomba de agua",
  CRUCETAS: "Crucetas",
  "RESERVORIO REFRIGERANTE": "Reservorio de refrigerante",
  "RESERVORIO REGRIGERANTE": "Reservorio de refrigerante",
  "TAPA DE REFRIGERANTE": "Tapa de refrigerante",
  "BASES DE MOTOR": "Bases de motor",
  "SENSOR CMP": "Sensor CMP",
  "CAUCHOS DE PAQUETE": "Cauchos de paquete",
  "FLOTADOR DE COMBUSTIBLE": "Flotador de combustible",
  "BOMBA DE COMBUSTIBLE": "Bomba de combustible",
  "SENSOR DE VELOCIDAD": "Sensor de velocidad",
  "TROMPO DE STOP": "Trompo de stop",
  "TROMPO DE NEUTRO": "Trompo de neutro",
  "TROMPO DE RETRO": "Trompo de retro",
};

function capitalizeWord(word: string) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

export function formatPartName(name: string): string {
  const normalizedName = name.trim().toUpperCase();
  const formattedName = formattedPartNames[normalizedName];

  if (formattedName) {
    return formattedName;
  }

  return normalizedName
    .toLowerCase()
    .split(" ")
    .map((word, index) => (index === 0 ? capitalizeWord(word) : word))
    .join(" ");
}

export function categorizePart(name: string) {
  const n = name.toLowerCase();

  if (n.includes("filtro") || n.includes("bujia") || n.includes("banda")) {
    return "Mantenimiento";
  }

  if (
    n.includes("pastilla") ||
    n.includes("freno") ||
    n.includes("zapata") ||
    n.includes("disco") ||
    n.includes("tambor")
  ) {
    return "Frenos";
  }

  if (
    n.includes("amortiguador") ||
    n.includes("rotula") ||
    n.includes("suspension") ||
    n.includes("barra") ||
    n.includes("terminal") ||
    n.includes("bocin") ||
    n.includes("ruliman")
  ) {
    return "Suspensión y dirección";
  }

  if (
    n.includes("sensor") ||
    n.includes("bobina") ||
    n.includes("trompo") ||
    n.includes("flotador")
  ) {
    return "Sensores y eléctrico";
  }

  if (
    n.includes("radiador") ||
    n.includes("refrigerante") ||
    n.includes("termostato") ||
    n.includes("bomba de agua") ||
    n.includes("manguera")
  ) {
    return "Refrigeración";
  }

  if (
    n.includes("embrague") ||
    n.includes("cruceta") ||
    n.includes("piloto")
  ) {
    return "Transmisión y embrague";
  }

  if (n.includes("faro") || n.includes("guia")) {
    return "Iluminación";
  }

  if (
    n.includes("motor") ||
    n.includes("cigüeñal") ||
    n.includes("valvula")
  ) {
    return "Motor";
  }

  if (n.includes("combustible")) {
    return "Combustible";
  }

  return "Otros";
}

export const catalog = parts.map((name, index) => ({
  id: index + 1,
  name: formatPartName(name),
  category: categorizePart(name),
  sku: `REP-${String(index + 1).padStart(4, "0")}`,
  stock:
    index % 5 === 0
      ? "Bajo pedido 24–48h"
      : index % 7 === 0
      ? "Confirmar stock"
      : "Disponible para cotización",
  price:
    index % 3 === 0
      ? "Precio por confirmar"
      : `$${(8 + index * 1.75).toFixed(2)}`,
  brand:
    index % 4 === 0
      ? "Alternativo"
      : index % 4 === 1
      ? "OEM equivalente"
      : index % 4 === 2
      ? "Premium"
      : "Económico",
  imageUrl: undefined,
}));
