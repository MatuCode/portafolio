import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  const active = (router.locale ?? "es").startsWith("es") ? "es" : "en";

  const go = (locale: "es" | "en") => {
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
      locale,
      shallow: true,
    });
  };

  return (
    <div className="fixed top-4 right-4 z-[60] flex gap-2">
      <button
        onClick={() => go("es")}
        className={`px-3 py-2 rounded-xl ring-1 ring-white/20 backdrop-blur ${
          active === "es" ? "bg-white/15 text-white" : "bg-black/40 text-white/80 hover:bg-black/50"
        }`}
        aria-pressed={active === "es"}
        title="Español"
      >
        ES
      </button>
      <button
        onClick={() => go("en")}
        className={`px-3 py-2 rounded-xl ring-1 ring-white/20 backdrop-blur ${
          active === "en" ? "bg-white/15 text-white" : "bg-black/40 text-white/80 hover:bg-black/50"
        }`}
        aria-pressed={active === "en"}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
