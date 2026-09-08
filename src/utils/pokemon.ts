import { typeColors } from "../palette/typeColors";

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
export function getTypeColor(type?: string): string {
  if (!type) return "#777777";
  // temos que tipar assim para não dar erro, basicamente significa que estamos pegando as chaves dentro do tipo typeColors
  // type in checa se type existe em typeColors (chave)
  return type in typeColors ? typeColors[type as keyof typeof typeColors] : "#777777";
}