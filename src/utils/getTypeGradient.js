import { TYPE_COLORS } from './typeColors';

export function getTypeGradient(types) {
  if (!types || types.length === 0) return 'gray';

  const colors = types.map(t => TYPE_COLORS[t.type.name] || 'gray');

  // Si tiene un solo tipo, repetimos el color para el gradiente
  if (colors.length === 1) colors.push(colors[0]);

  return `linear-gradient(135deg, ${colors.join(', ')})`;
}