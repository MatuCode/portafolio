// src/i18n/ui.ts
export type Lang = "es" | "en";

export const ui = {
  es: {
    contact: {
      title: "Contacto",
      desc: "Puedes contactarme por correo o por mis redes.",
      email: "Enviar correo",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
  },
  en: {
    contact: {
      title: "Contact",
      desc: "You can reach me by email or social networks.",
      email: "Send email",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
  },
} as const;
