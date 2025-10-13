/* *Developed by pmatute */
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  const current = (router.locale ?? "es").startsWith("es") ? "es" : "en";

  const switchTo = current === "es" ? "en" : "es";

  const changeLocale = () => {
    // Mantiene la ruta/pestaña actual, solo cambia el locale
    router.push(
      { pathname: router.pathname, query: router.query },
      undefined,
      { locale: switchTo, shallow: true }
    );
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        type="button"
        onClick={changeLocale}
        className="flex items-center gap-2 rounded-xl bg-black/50 px-3 py-2 text-sm text-white
                   ring-1 ring-white/15 backdrop-blur hover:bg-white/10 transition"
        aria-label={`Cambiar idioma a ${switchTo === "en" ? "English" : "Español"}`}
        title={switchTo === "en" ? "Switch to English" : "Cambiar a Español"}
      >
        <span className="opacity-80">Idioma:</span>
        <span className="font-medium">
          {current === "es" ? "ES" : "EN"} ▸ {switchTo.toUpperCase()}
        </span>
      </button>
    </div>
  );
}
