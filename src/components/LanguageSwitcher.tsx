/* src/components/LanguageSwitcher.tsx
 * Botón flotante para cambiar entre ES y EN usando Next Router.
 */
import React from "react";
import { useRouter } from "next/router";

type Props = { className?: string };

const LanguageSwitcher: React.FC<Props> = ({ className = "" }) => {
  const router = useRouter();
  const current = (router.locale ?? "es").startsWith("es") ? "es" : "en";
  const next = current === "es" ? "en" : "es";

  const change = () => {
    router.push(
      { pathname: router.pathname, query: router.query },
      undefined,
      { locale: next, shallow: true }
    );
  };

  return (
    <button
      onClick={change}
      className={`fixed top-6 right-6 z-[60] rounded-xl px-3 py-2 text-sm
                 bg-white/10 hover:bg-white/15 text-white ring-1 ring-white/25
                 backdrop-blur transition ${className}`}
      aria-label="Change language"
      title={`Switch to ${next.toUpperCase()}`}
    >
      {current.toUpperCase()}
    </button>
  );
};

export default LanguageSwitcher;
