/* *Developed by pmatute */
import React from "react";

export default function SiteBackground() {
  return (
    <>
      {/* Capa 1: imagen global */}
      <div
        aria-hidden
        className="
          fixed inset-0 -z-50
          bg-[url('/bg.jpg')] bg-cover bg-center
        "
      />

      {/* Capa 2: degradado tenue para legibilidad (opcional) */}
      <div
        aria-hidden
        className="
          fixed inset-0 -z-40
          bg-gradient-to-br from-black/60 via-black/40 to-transparent
          pointer-events-none
        "
      />

      {/*
      Si prefieres el video marca de agua:
      <video
        className="fixed inset-0 -z-50 w-full h-full object-cover"
        src="/videos/marca-agua.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      */}
    </>
  );
}
