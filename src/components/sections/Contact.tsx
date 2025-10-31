import { useRouter } from "next/router";

import { getDictionary } from "@/i18n";
import ContactSection from "../ContactSection";

export default function Contact() {
  const { locale } = useRouter();
  const dictionary = getDictionary(locale);

  return <ContactSection copy={dictionary.contact} />;
}
