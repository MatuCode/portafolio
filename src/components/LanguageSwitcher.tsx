import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const active = (router.locale ?? "es").startsWith("es") ? "es" : "en";

  const go = (locale: "es" | "en") => {
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, {
      locale,
      shallow: true,
    });
    setIsOpen(false);
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Cerrar dropdown con Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const languages = [
    { code: "es", label: "Español", flag: "ES" },
    { code: "en", label: "English", flag: "EN" },
  ];

  return (
    <div className="fixed top-8 right-8 z-[70]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-sm sm:text-base font-bold uppercase text-gray-800 ring-2 ring-white/20 backdrop-blur transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30 focus-visible:ring-offset-black/40"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
          boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #e2e8f0 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)';
        }}
        aria-label="Cambiar idioma"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {active.toUpperCase()}
        <svg 
          className={`ml-1 h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 rounded-xl bg-white/95 backdrop-blur-md shadow-2xl ring-1 ring-white/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {languages.map((lang) => {
              const isActive = lang.code === active;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => go(lang.code as "es" | "en")}
                  className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{lang.label}</span>
                    <span className="text-xs font-bold uppercase text-gray-500">{lang.flag}</span>
                    {isActive && (
                      <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
