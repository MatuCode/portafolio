/* *Developed by pmatute */
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import SiteBackground from "@/components/SiteBackground";
import LanguageSwitcher from "@/components/LanguageSwitcher"; // ← aquí

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SiteBackground />
      <LanguageSwitcher /> {/* ← botón ES/EN arriba-derecha */}
      <div className="relative z-10">
        <Component {...pageProps} />
      </div>
    </>
  );
}
