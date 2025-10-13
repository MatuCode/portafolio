// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  outputFileTracingRoot: __dirname, // solo para silenciar el warning
  // si usas imágenes remotas, añade hosts aquí:
  // images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.jsdelivr.net' }] },
};

export default nextConfig;
