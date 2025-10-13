/** @type {import('tailwindcss').Config} */
module.exports = {
  // Asegúrate de incluir pages, components y app
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Lista blanca mínima para que el cuadro NUNCA se purgue en producción
  safelist: [
    "bg-neutral-900/60",
    "bg-black/60",
    "backdrop-blur-md",
    "ring-1",
    "ring-white/20",
    "ring-white/40",
    "shadow-2xl",
    "rounded-2xl",
    "p-8",
    "sm:p-10",
    "z-20",
    "z-[40]",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
