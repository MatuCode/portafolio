/* *Developed by pmatute */
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configurar el worker de PDF.js para react-pdf solo en el cliente
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

// Componente para renderizar PDF como imagen profesional
function PdfImageViewer({ 
  pdfUrl, 
  alt,
  loadingText = "Cargando certificado...",
  errorText = "Error al cargar el certificado",
  previousText = "← Anterior",
  nextText = "Siguiente →",
  pageText = "Página"
}: { 
  pdfUrl: string; 
  alt: string;
  loadingText?: string;
  errorText?: string;
  previousText?: string;
  nextText?: string;
  pageText?: string;
}) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(2.0);
  const [mounted, setMounted] = useState(false);

  // Solo ejecutar en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error loading PDF:", error);
    setError(errorText);
    setLoading(false);
  }

  // Ajustar escala según el tamaño de pantalla
  useEffect(() => {
    if (!mounted) return;
    
    const updateScale = () => {
      if (window.innerWidth < 768) {
        setScale(1.5);
      } else if (window.innerWidth < 1024) {
        setScale(1.8);
      } else {
        setScale(2.2);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-sm ring-1 ring-white/20 shadow-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30 mb-4"></div>
        <div className="text-white/70 text-sm font-medium">{loadingText}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-sm ring-1 ring-white/20 shadow-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/30 mb-4"></div>
        <div className="text-white/70 text-sm font-medium">{loadingText}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-sm ring-1 ring-white/20 shadow-2xl">
        <div className="text-white/60 text-center px-4">
          <svg className="w-12 h-12 mx-auto mb-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Contenedor con fondo blanco para el PDF */}
      <div className="flex items-center justify-center rounded-2xl bg-white p-2 md:p-6 shadow-2xl overflow-hidden">
        <div className="relative max-w-full w-full flex justify-center">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center min-h-[600px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
              </div>
            }
            error={
              <div className="flex items-center justify-center min-h-[600px] text-gray-600">
                <p>{errorText}</p>
              </div>
            }
          >
            <div className="flex justify-center">
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="!shadow-none"
              />
            </div>
          </Document>
        </div>
      </div>

      {/* Controles de navegación si hay múltiples páginas */}
      {numPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
            disabled={pageNumber <= 1}
            className="px-4 py-2 rounded-lg bg-white/10 text-white/90 ring-1 ring-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
          >
            {previousText}
          </button>
          <span className="text-white/80 text-sm font-medium px-4 py-2 bg-white/5 rounded-lg">
            {pageText} {pageNumber} de {numPages}
          </span>
          <button
            onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 rounded-lg bg-white/10 text-white/90 ring-1 ring-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
          >
            {nextText}
          </button>
        </div>
      )}
    </div>
  );
}

export default PdfImageViewer;

