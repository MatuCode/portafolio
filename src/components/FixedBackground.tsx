/* *Developed by pmatute */
'use client';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function FixedBackground() {
  const src = `${BASE}/bg/pablo-bg.jpg`; // coloca tu imagen aquí: /public/bg/pablo-bg.jpg

  return (
    <>
      {/* base por si tarda la imagen */}
      <div className="fixed inset-0 -z-50 bg-black" />

      {/* foto fullscreen fija */}
      <div
        className="pointer-events-none fixed inset-0 -z-40"
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '70% 40%', // enfoca el lado derecho (tu rostro)
        }}
      />

      {/* overlay para contraste/legibilidad */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(1200px_700px_at_70%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.55)_100%)]" />
    </>
  );
}
