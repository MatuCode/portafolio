/* *Developed by pmatute */
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Renderiza directamente en <body> para aislar de transforms/animaciones
  return createPortal(children, document.body);
}
