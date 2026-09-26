import { en, type TranslationKey } from './locales/en';
import { fr } from './locales/fr';
export type Language = 'en' | 'fr';
export type Translator = (key: TranslationKey, values?: Record<string, string | number>) => string;
export function translator(language: Language): Translator {
  return (key, values = {}) => (language === 'fr' ? fr[key] : en[key])
    .replace(/\{(\w+)\}/g, (match, name: string) => String(values[name] ?? match));
}
