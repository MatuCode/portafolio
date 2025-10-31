import es from './es.json';
import en from './en.json';

export const dictionaries = {
  es,
  en,
} as const;

export type Locale = keyof typeof dictionaries;

export function getDictionary(locale?: string) {
  if (!locale) return dictionaries.es;
  const key = locale.split('-')[0] as Locale;
  return dictionaries[key] ?? dictionaries.es;
}
