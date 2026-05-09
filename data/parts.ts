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
  name,
  category: categorizePart(name),
  sku: `REP-${String(index + 1).padStart(4, "0")}`,
  stock:
    index % 5 === 0
      ? "Bajo pedido"
      : index % 7 === 0
      ? "Consultar"
      : "Disponible",
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
}));