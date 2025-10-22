import { pastelPokemonTypes } from "./pastelTypeColors";

export function getTypeGradientPastel(types) {
  if (!types || types.length === 0) return 'gray';

  const colors = types.map(t => pastelPokemonTypes[t.type.name] || 'gray');

  // Si tiene un solo tipo, repetimos el color para el gradiente
  if (colors.length === 1) colors.push(colors[0]);

  return `linear-gradient(67deg, ${colors.join(', ')})`;
}