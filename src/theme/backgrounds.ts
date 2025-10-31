// src/theme/backgrounds.ts
import type { CSSProperties } from 'react';

/**
 * Estilo compartido para el fondo fijo (negro + degradados cian).
 * Úsalo con <div style={sharedBackgroundStyle} />
 */
export const sharedBackgroundStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: -1,
  pointerEvents: 'none',
  background:
    'radial-gradient(1200px 600px at 100% -20%, rgba(0,255,255,0.25), transparent 60%), ' +
    'radial-gradient(1200px 600px at -10% 120%, rgba(0,255,255,0.25), transparent 60%)',
};

/** Helper para componer paths con BASE_PATH si lo usas en Vercel */
export const withBasePath = (p: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`;

// (opcional) export por defecto para que también puedas importar default
export default sharedBackgroundStyle;
